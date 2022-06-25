import { FC, useEffect, useMemo, useState } from "react"

export type TimerMode = "focus" | "rest"

export type TimerProps = {
  mode?: TimerMode
  rest_time_in_minutes?: number
  focus_time_in_minutes?: number
}

export const Timer: FC<TimerProps> = ({
  mode = "focus",
  rest_time_in_minutes = 5,
  focus_time_in_minutes = 25,
}) => {
  const formatTimeNumber = (time_in_minutes: number): string => {
    const response = `${time_in_minutes.toLocaleString("pt-BR", {
      minimumIntegerDigits: 2,
    })}:00`

    return response
  }

  const [timerMode, setTimerMode] = useState<TimerMode>(mode)
  const isFocusMode = useMemo(() => timerMode === "focus", [timerMode])
  const modeLabelText = useMemo(() => (isFocusMode ? "time to focus" : "get some rest"), [])

  const [timer, setTimer] = useState(
    isFocusMode ? formatTimeNumber(focus_time_in_minutes) : formatTimeNumber(rest_time_in_minutes),
  )

  useEffect(() => {
    setTimerMode(mode)
  }, [mode])

  return (
    <section>
      <small>{modeLabelText}</small>
      <p>{timer}</p>
    </section>
  )
}
