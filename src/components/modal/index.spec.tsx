import { fireEvent, render, RenderResult } from "../../test/testing-library"
import { Modal as Sut } from "."

let sut: RenderResult

describe("Modal", () => {
  beforeEach(() => {
    sut = render(<Sut isVisible />)
  })

  it("Should close modal", () => {
    const { getByTestId } = sut

    const closeModalButtonElement = getByTestId("close-modal-button")

    fireEvent.click(closeModalButtonElement)

    expect(closeModalButtonElement).not.toBeInTheDocument()
  })
})
