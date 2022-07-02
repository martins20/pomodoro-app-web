import { render, RenderResult } from "@testing-library/react"

import { Sidebar as Sut } from "."

let sut: RenderResult

describe("Sidebar", () => {
  beforeEach(() => {
    sut = render(<Sut />)
  })

  it("Should render sidebar", () => {
    const { getByTestId } = sut

    const sideBarElement = getByTestId("sidebar")

    expect(sideBarElement).toBeInTheDocument()
  })
})
