import React, {
  useRef,
  useState,
  useEffect,
  type ChangeEventHandler,
  type ChangeEvent,
  type KeyboardEventHandler,
  type KeyboardEvent,
} from 'react'

export interface TimecodeInputProps {
  name: string
  onChange: (value: number) => void
  value: number
  min: number
  absoluteMin: number
  max: number
  absoluteMax: number
  error?: boolean
  className?: string
}

export const TimecodeInput: React.FC<TimecodeInputProps> = ({
  name,
  onChange,
  value,
  min,
  absoluteMin,
  max,
  absoluteMax,
  error = false,
  className = '',
}) => {
  const isInputing = useRef<boolean>(false)
  const absoluteTimecode = useRef(Math.trunc(value))
  const [displayTimecode, setDisplayTimecode] = useState(
    Math.floor(Math.trunc(value) / 60)
      .toString()
      .padStart(2, '0') +
      ':' +
      (Math.trunc(value) % 60).toString().padStart(2, '0'),
  )
  const [rawTimecode, setRawTimecode] = useState(Math.trunc(value))

  useEffect(() => {
    if (isInputing.current) return
    absoluteTimecode.current = Math.trunc(value)
    setDisplayTimecode(
      Math.floor(Math.trunc(value) / 60)
        .toString()
        .padStart(2, '0') +
        ':' +
        (Math.trunc(value) % 60).toString().padStart(2, '0'),
    )
    setRawTimecode(value)
  }, [value])

  useEffect(() => {
    handleFormat()
  }, [min, max])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    isInputing.current = true
    if (e.target.value == '') {
      setDisplayTimecode('')
      absoluteTimecode.current = 0
      setRawTimecode(0)
      return
    }

    let pureTimecode: string = e.target.value.replace(/[^0-9:]/, '')
    let [minutes, seconds] = timecodeStringToMinSec(pureTimecode)

    absoluteTimecode.current = minutes * 60 + seconds
    // onChange(minutes * 60 + seconds)
    setDisplayTimecode(pureTimecode)
    setRawTimecode(minutes * 60 + seconds)
  }

  const handleFormat = () => {
    if (absoluteTimecode.current > absoluteMax) {
      absoluteTimecode.current = absoluteMax
      onChange(absoluteMax)
      setDisplayTimecode(
        Math.floor(absoluteMax / 60)
          .toString()
          .padStart(2, '0') +
          ':' +
          (absoluteMax % 60).toString().padStart(2, '0'),
      )
      setRawTimecode(absoluteMax)
      return
    }
    if (absoluteTimecode.current < absoluteMin) {
      absoluteTimecode.current = absoluteMin
      onChange(absoluteMin)
      setDisplayTimecode(
        Math.floor(absoluteMin / 60)
          .toString()
          .padStart(2, '0') +
          ':' +
          (absoluteMin % 60).toString().padStart(2, '0'),
      )
      setRawTimecode(absoluteMin)
      return
    }
    if (absoluteTimecode.current > max) {
      absoluteTimecode.current = max
      onChange(max)
      setDisplayTimecode(
        Math.floor(max / 60)
          .toString()
          .padStart(2, '0') +
          ':' +
          (max % 60).toString().padStart(2, '0'),
      )
      setRawTimecode(max)
      return
    }
    if (absoluteTimecode.current < min) {
      absoluteTimecode.current = min
      onChange(min)
      setDisplayTimecode(
        Math.floor(min / 60)
          .toString()
          .padStart(2, '0') +
          ':' +
          (min % 60).toString().padStart(2, '0'),
      )
      setRawTimecode(min)
      return
    }
    onChange(absoluteTimecode.current)
    setDisplayTimecode(
      Math.floor(absoluteTimecode.current / 60)
        .toString()
        .padStart(2, '0') +
        ':' +
        (absoluteTimecode.current % 60).toString().padStart(2, '0'),
    )
    setRawTimecode(absoluteTimecode.current)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e: KeyboardEvent<HTMLInputElement>) => {
    isInputing.current = true
    if (e.key === 'ArrowUp' || e.code === 'ArrowUp') {
      e.preventDefault()
      absoluteTimecode.current = absoluteTimecode.current + 1
      handleFormat()
    }

    if (e.key === 'ArrowDown' || e.code === 'ArrowDown') {
      e.preventDefault()
      absoluteTimecode.current = absoluteTimecode.current - 1
      handleFormat()
    }
  }

  const timecodeStringToMinSec = (timecodeString: string): [number, number] => {
    let timecodeParts = timecodeString.split(':')
    let minutes = 0
    let seconds = 0
    if (timecodeParts.length > 1) {
      minutes = +timecodeParts.shift()!
      seconds = +timecodeParts.join('').slice(0, 2)

      if (seconds > 59) {
        minutes += Math.floor(seconds / 60)
        seconds = seconds % 60
      }
    } else {
      let reversedPureTimecode = timecodeString.split('').reverse().join('')
      seconds = +reversedPureTimecode.slice(0, 2).split('').reverse().join('')
      minutes = +reversedPureTimecode.slice(2).split('').reverse().join('')

      if (seconds > 59) {
        minutes += Math.floor(seconds / 60)
        seconds = seconds % 60
      }
    }

    return [minutes, seconds]
  }

  return (
    <>
      <input
        type="text"
        id={name}
        name={name}
        onChange={handleChange}
        onBlur={() => {
          handleFormat()
          isInputing.current = false
        }}
        onKeyDown={handleKeyDown}
        value={displayTimecode}
        aria-invalid={error}
        aria-errormessage={error ? name + '_error' : undefined}
        className={`box-content w-[calc(5ch+2px)] appearance-none px-3 py-1.5 text-center font-mono text-sm text-text-secondary-contrast outline-0 focus-visible:ring-1 focus-visible:ring-text-primary/50 ${className}`}
      />
      <input type="hidden" name={`${name}_raw`} value={rawTimecode} />
    </>
  )
}
