import { fireEvent, render, RenderResult } from "../../test/testing-library"

import { Modal as Sut } from "."

let sut: RenderResult

const mockToggleModalVisibility = jest.fn().mockImplementation(() => {
  console.log("I was called")
})

jest.mock("../../hooks", () => ({
  useModal: () => ({
    toggleModalVisibility: mockToggleModalVisibility,
  }),
}))

describe("Modal", () => {
  beforeEach(() => {
    sut = render(
      <Sut isVisible>
        <h1>Im here</h1>
      </Sut>,
    )
  })

  it("Should render a modal component", async () => {
    const { getByText } = sut

    const textElement = getByText("Im here")

    expect(textElement).toBeInTheDocument()
  })

  it("Should close modal", async () => {
    const { getByTestId } = sut

    const closeModalButtonElement = getByTestId("close-modal-button")

    fireEvent.click(closeModalButtonElement)

    expect(mockToggleModalVisibility).toHaveBeenCalled()
  })
})
