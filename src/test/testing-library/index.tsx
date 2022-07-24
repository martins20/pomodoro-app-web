import { BrowserRouter } from "react-router-dom"
import { FC, PropsWithChildren, ReactElement } from "react"
import { render, RenderOptions } from "@testing-library/react"

import { Header } from "../../components"

import { AppProvider } from "../../contexts"

const MockAppProvider: FC<PropsWithChildren> = ({ children }) => (
  <AppProvider>
    <BrowserRouter>
      <Header />

      {children}
    </BrowserRouter>
  </AppProvider>
)

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: MockAppProvider, ...options })

export * from "@testing-library/react"

export { customRender as render }
