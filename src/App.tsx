import { Timer } from "./components"
import { GlobalStyle } from "./styles/styled-component/global-style"

export function App() {
  return (
    <>
      <Timer focus_time_in_minutes={0.5} rest_time_in_minutes={0.5} />
      <GlobalStyle />
    </>
  )
}
