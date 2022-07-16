import { fireEvent, render, RenderResult, waitFor } from "../../test/testing-library"

import { Modal as Sut } from "."
import { ModalProvider } from "../../contexts/modal"

let sut: RenderResult

describe("Modal", () => {
  beforeEach(() => {
    sut = render(<Sut isVisible />, { wrapper: ModalProvider })
  })

  it("Should close modal", async () => {
    const { getByTestId } = sut

    const closeModalButtonElement = getByTestId("close-modal-button")

    fireEvent.click(closeModalButtonElement)

    await waitFor(async () => expect(closeModalButtonElement).not.toBeInTheDocument())
  })
})
