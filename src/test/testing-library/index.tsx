import { render, RenderOptions } from "@testing-library/react"
import { ReactElement } from "react"

import { AppProvider } from "../../contexts"

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AppProvider, ...options })

export * from "@testing-library/react"

export { customRender as render }
