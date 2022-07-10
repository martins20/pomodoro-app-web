import { AppProvider } from "./contexts"
import { AppRoutes } from "./lib/react-router-dom/routes"
import { GlobalStyle } from "./styles/styled-component/global-style"

export function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <GlobalStyle />
    </AppProvider>
  )
}
