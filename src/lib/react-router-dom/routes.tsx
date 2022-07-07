import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "../../pages/home"

export const AppRoutes = () => (
  <Router basename="/pomodoro-app-web">
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
)
