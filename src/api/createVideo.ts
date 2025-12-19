export interface CreateVideoSuccess {
  success: true
  message: string
}

export interface CreateVideoError {
  success: false
  message: string
  errors: CreateVideoErrorErrors
}

export interface CreateVideoErrorErrors {
  [key: string]: string[]
}

export interface uploadPreview {
  uuid: string
  name: string
  status: 'none' | 'uploading' | 'processing' | 'done' | 'error'
  poster?: string
  progress?: number
}

interface PostSSEMessageEvent extends MessageEvent {
  data: ProgressMessage
}

interface ProgressMessage {
  uuid: string
  name: string
  status: 'none' | 'uploading' | 'processing' | 'done' | 'error'
  progress?: number
  poster?: string
  reason?: string
}

interface PostSSECloseEvent extends CloseEvent {
  reason: string
}

export type CreateVideoResponse = CreateVideoSuccess | CreateVideoError

export const createVideo = async (
  file: File,
  previewUpload: (data: uploadPreview | null) => void,
  setDisabled: (value: boolean) => void,
): Promise<CreateVideoResponse> => {
  return new Promise((resolve) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      let requestSentTime = Date.now()
      let previewingUpload = false
      const xs = PostSSE(`${import.meta.env.VITE_API_ENDPOINT}/videos`, {
        method: 'POST',
        body: formData,
      })

      xs.addEventListener('close', () => {
        setDisabled(false)
      })

      xs.addEventListener('error', (e: Event) => {
        if (!(e instanceof CloseEvent)) throw 'not a CloseEvent'
        const event = e as PostSSECloseEvent

        previewUpload(null)
        resolve({
          success: false,
          message: event.reason,
          errors: {},
        })
      })

      xs.addEventListener('message', (e: Event) => {
        if (!(e instanceof MessageEvent)) throw 'not a MessageEvent'
        const event = e as PostSSEMessageEvent

        if (event.data.status === 'done') {
          previewUpload({
            uuid: event.data.uuid,
            name: event.data.name,
            status: event.data.status,
            poster: event.data.poster,
          })
          resolve({
            success: true,
            message: 'Video successfully uploaded',
          })
          return
        }

        if (event.data.status === 'uploading') {
          if (requestSentTime + 500 < Date.now() && event.data.progress! < 50) {
            previewingUpload = true
          }

          if (previewingUpload) {
            previewUpload({
              uuid: event.data.uuid,
              name: file.name,
              status: event.data.status,
              progress: event.data.progress,
            })
          }

          return
        }

        previewUpload({
          uuid: event.data.uuid,
          name: file.name,
          status: event.data.status,
          progress: event.data.progress,
        })
      })
    } catch (error) {
      console.error('Create Video Error:', error)
      resolve({
        success: false,
        message: 'Network error',
        errors: {},
      })
    }
  })
}

export function PostSSE(
  url: string,
  opts: { method?: string; headers?: { [key: string]: string }; timeout?: number; body: any },
) {
  const eventTarget = new EventTarget()
  const xhr = new XMLHttpRequest()

  xhr.open(opts.method || 'GET', url, true)
  for (var k in opts.headers) {
    xhr.setRequestHeader(k, opts.headers[k])
  }
  xhr.withCredentials = true

  let lastUploadPercent = 0
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percentComplete = Math.ceil((e.loaded / e.total) * 100)

      if (lastUploadPercent !== percentComplete) {
        lastUploadPercent = percentComplete

        eventTarget.dispatchEvent(
          new MessageEvent('message', {
            data: { uuid: 'UUID_NOT_SET_YET', status: 'uploading', progress: percentComplete },
          }),
        )
      }
    }
  }

  xhr.onreadystatechange = (_) => {
    const isJsonString = (str: string) => {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    }

    if (xhr.status !== 200 && xhr.readyState === 3) {
      if (isJsonString(xhr.response)) {
        const jsonResponse = JSON.parse(xhr.response)
        eventTarget.dispatchEvent(new CloseEvent('error', { reason: jsonResponse.errors }))
      }
    }
  }

  let start = 0
  xhr.onprogress = function () {
    var i, chunk
    while ((i = xhr.responseText.indexOf('\n\n', start)) >= 0) {
      chunk = xhr.responseText.slice(start, i)
      start = i + 2
      if (chunk.length) {
        const event = parseMessageEvent(chunk)

        if (event.data.status === 'error') {
          eventTarget.dispatchEvent(new CloseEvent('error', { reason: event.data.reason }))
        } else {
          eventTarget.dispatchEvent(new MessageEvent(event.type, { data: event.data }))
        }
      }
    }
  }

  xhr.onloadend = (_) => {
    eventTarget.dispatchEvent(new CloseEvent('close'))
  }

  if (opts.timeout) xhr.timeout = opts.timeout
  xhr.ontimeout = (_) => {
    eventTarget.dispatchEvent(new CloseEvent('error', { reason: 'Network request timed out' }))
  }
  xhr.onerror = (_) => {
    eventTarget.dispatchEvent(new CloseEvent('error', { reason: xhr.responseText || 'Network request failed' }))
  }
  xhr.onabort = (_) => {
    eventTarget.dispatchEvent(new CloseEvent('error', { reason: 'Network request aborted' }))
  }

  xhr.send(opts.body)

  return eventTarget
}

function parseMessageEvent(message: string) {
  let type = 'message',
    start = 0

  if (message.startsWith('event: ')) {
    start = message.indexOf('\n')
    type = message.slice(7, start)
  }
  start = message.indexOf(': ', start) + 2
  let data = JSON.parse(message.slice(start, message.length)) as ProgressMessage

  return { type, data }
}
