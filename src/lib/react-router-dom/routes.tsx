import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Header } from "../../components"
import { Home } from "../../pages/home"

export const AppRoutes = () => (
  <Router basename="/pomodoro-app-web">
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
)
