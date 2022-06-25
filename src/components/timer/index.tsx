import { FC, useState } from "react"

export type TimerMode = "focus" | "rest"

export type TimerProps = {
  mode?: TimerMode
}

export const Timer: FC<TimerProps> = ({ mode = "focus" }) => {
  const [label, setLabel] = useState(mode === "focus" ? "time to focus" : "get some rest")

  return <h1>{label}</h1>
}
