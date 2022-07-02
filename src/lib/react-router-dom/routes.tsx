import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "../../pages/home"

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
)
