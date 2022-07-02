import { fireEvent, render, RenderResult } from "@testing-library/react"

import { Input as Sut } from "."

let sut: RenderResult

class SutSpy {
  getInputElement() {
    const { getByTestId } = sut

    const inputElement = getByTestId("input")

    return inputElement
  }
}

let sutSpy: SutSpy

const mockOnInputSubmit = jest.fn()
const mockGetInputValidation = jest.fn().mockImplementation(() => true)

describe("Input", () => {
  const validationMessage = "Test message"

  beforeEach(() => {
    sut = render(
      <Sut
        data-testid="input"
        validation={{
          message: validationMessage,
          getInputValidation: mockGetInputValidation,
        }}
        onInputSubmit={mockOnInputSubmit}
      />,
    )
    sutSpy = new SutSpy()
  })

  it("Should call onSubmitInput when user press enter key", () => {
    const inputElement = sutSpy.getInputElement()

    fireEvent.change(inputElement, { target: { value: "TODO 01" } })

    fireEvent.keyUp(inputElement, {
      key: "Enter",
    })

    expect(mockOnInputSubmit).toHaveBeenCalledTimes(1)
  })

  it("Should not call onSubmitInput, when validation fails", () => {
    mockGetInputValidation.mockImplementationOnce(() => false)

    const inputElement = sutSpy.getInputElement()

    fireEvent.keyUp(inputElement, {
      key: "Enter",
    })

    expect(mockOnInputSubmit).toHaveBeenCalledTimes(0)
  })
})
