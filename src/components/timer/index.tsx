import { FC, useEffect, useMemo, useState } from "react"
import { putTwoMinimumIntegerDigits } from "../../utils/put-two-minimum-integer-digits"

import { Container, Label, TimerText } from "./styles"

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
  const formatTimeNumber = (time_in_seconds: number): string => {
    const minutes = Math.floor(time_in_seconds / 60)
    const seconds = time_in_seconds % 60

    const response = `${putTwoMinimumIntegerDigits(minutes)}:${putTwoMinimumIntegerDigits(seconds)}`

    return response
  }

  const [timerMode, setTimerMode] = useState<TimerMode>(mode)
  const [countDownId, setCountDownId] = useState<NodeJS.Timeout | undefined>()

  const isFocusMode = useMemo(() => timerMode === "focus", [timerMode])
  const modeLabelText = useMemo(() => (isFocusMode ? "Focus time" : "Rest time"), [])

  const [focusTimerInSeconds, setFocusTimerInSeconds] = useState(focus_time_in_minutes * 60)
  const [restTimerInSeconds, setRestTimerInSeconds] = useState(rest_time_in_minutes * 60)

  const setCountDownTimer = () =>
    isFocusMode ? formatTimeNumber(focusTimerInSeconds) : formatTimeNumber(restTimerInSeconds)

  const [timer, setTimer] = useState(setCountDownTimer())

  const clearCountDownProcess = () => {
    if (countDownId) clearInterval(countDownId)
  }

  const startCountDown = (): void => {
    const oneSecond = 1 * 1000

    clearCountDownProcess()

    const intervalId = setInterval(() => {
      if (isFocusMode) setFocusTimerInSeconds((state) => state - 1)
    }, oneSecond)

    setCountDownId(intervalId)
  }

  useEffect(() => {
    setTimerMode(mode)
  }, [mode])

  // Setting CountDown Timer while focusTimerInSeconds update
  useEffect(() => {
    setTimer(setCountDownTimer())
  }, [focusTimerInSeconds])

  // Kill countDown process when component is unmounted.
  useEffect(() => clearCountDownProcess, [])

  return (
    <Container>
      <Label isFocusMode={isFocusMode}>{modeLabelText}</Label>
      <TimerText isFocusMode={isFocusMode}>{timer}</TimerText>

      <button type="button" onClick={startCountDown}>
        Start
      </button>
    </Container>
  )
}
