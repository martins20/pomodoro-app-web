import { FC, useEffect, useMemo, useState } from "react"

import { Container, Label, TimerText } from "./styles"
import { putTwoMinimumIntegerDigits } from "../../utils/put-two-minimum-integer-digits"
import { Button } from "../button"

export type TimerMode = "focus" | "rest"

export type TimerProps = {
  mode?: TimerMode
  rest_time_in_minutes?: number
  focus_time_in_minutes?: number
}

export const Timer: FC<TimerProps> = ({
  mode = "focus",
  rest_time_in_minutes = 15,
  focus_time_in_minutes = 45,
}) => {
  const formatTimeNumber = (time_in_seconds: number): string => {
    const minutes = Math.floor(time_in_seconds / 60)
    const seconds = time_in_seconds % 60

    const response = `${putTwoMinimumIntegerDigits(minutes)}:${putTwoMinimumIntegerDigits(seconds)}`

    return response
  }

  const getTimerInSeconds = (timer_in_minutes: number): number => timer_in_minutes * 60

  const [timerMode, setTimerMode] = useState<TimerMode>(mode)
  const [countDownId, setCountDownId] = useState<NodeJS.Timeout | undefined>()

  const isFocusMode = useMemo(() => timerMode === "focus", [timerMode])
  const buttonText = useMemo(() => (countDownId ? "Pause" : "Start"), [countDownId])
  const modeLabelText = useMemo(() => (isFocusMode ? "Focus time" : "Rest time"), [isFocusMode])

  const [restTimerInSeconds, setRestTimerInSeconds] = useState(
    getTimerInSeconds(rest_time_in_minutes),
  )
  const [focusTimerInSeconds, setFocusTimerInSeconds] = useState(
    getTimerInSeconds(focus_time_in_minutes),
  )

  const setCountDownTimer = (timeInSeconds: number) => formatTimeNumber(timeInSeconds)

  const [timer, setTimer] = useState(
    setCountDownTimer(isFocusMode ? focusTimerInSeconds : restTimerInSeconds),
  )

  const clearCountDownProcess = () => {
    if (countDownId) {
      clearInterval(countDownId)
      setCountDownId(undefined)
    }
  }

  const startCountDown = (): void => {
    const oneSecond = 1 * 1000

    const intervalId = setInterval(() => {
      if (isFocusMode) {
        setFocusTimerInSeconds((state) => state - 1)
      } else {
        setRestTimerInSeconds((state) => state - 1)
      }
    }, oneSecond)

    setCountDownId(intervalId)
  }

  const toggleCountDownProcess = () => {
    if (!countDownId) {
      startCountDown()
    } else {
      clearCountDownProcess()
    }
  }

  const toggleTimerMode = () => {
    clearCountDownProcess()

    if (isFocusMode) {
      setTimerMode("rest")
      setFocusTimerInSeconds(getTimerInSeconds(focus_time_in_minutes))
    } else {
      setTimerMode("focus")
      setRestTimerInSeconds(getTimerInSeconds(rest_time_in_minutes))
    }
  }

  // Setting CountDown Timer while focusTimerInSeconds update
  useEffect(() => {
    const isSomeCoundDownReachToZero = !focusTimerInSeconds || !restTimerInSeconds

    if (isSomeCoundDownReachToZero) toggleTimerMode()

    setTimer(setCountDownTimer(isFocusMode ? focusTimerInSeconds : restTimerInSeconds))
  }, [focusTimerInSeconds, restTimerInSeconds])

  // Kill countDown process when component is unmounted.
  useEffect(() => clearCountDownProcess, [])

  return (
    <Container>
      <Label>{modeLabelText}</Label>
      <TimerText>{timer}</TimerText>

      <Button text={buttonText} onClick={toggleCountDownProcess} />
    </Container>
  )
}
