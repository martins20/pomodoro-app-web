import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

function AppWithCallbackAfterRender() {
  return <App />
}

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container!)
root.render(<AppWithCallbackAfterRender />)
