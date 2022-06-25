import { FC, useMemo, useState } from "react"

export type TimerMode = "focus" | "rest"

export type TimerProps = {
  mode?: TimerMode
}

export const Timer: FC<TimerProps> = ({ mode = "focus" }) => {
  const isFocusMode = useMemo(() => mode === "focus", [mode])

  const [label, setLabel] = useState(isFocusMode ? "time to focus" : "get some rest")
  const [timer, setTimer] = useState(isFocusMode ? "25:00" : "05:00")

  return (
    <section>
      <small>{label}</small>
      <p>{timer}</p>
    </section>
  )
}
