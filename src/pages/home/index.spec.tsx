import { render, RenderResult } from "@testing-library/react"
import { Home as Sut } from "."

let sut: RenderResult

describe("Home", () => {
  beforeEach(() => {
    sut = render(<Sut />)
  })

  it("Should render home component", () => {
    const { getByTestId } = sut

    const ContainerElement = getByTestId("home")

    expect(ContainerElement).toBeInTheDocument()
  })
})
