import { cleanup, fireEvent, render, RenderResult } from "../../test/testing-library"

import { Button as Sut } from "."

let sut: RenderResult

type CallbackFunction = () => void

class SutSpy {
  setButtonText(text: string) {
    cleanup()

    sut = render(<Sut text={text} />)
  }

  setClickCallbackFunction(callbackFunction: CallbackFunction) {
    cleanup()

    sut = render(<Sut text="Test" onClick={callbackFunction} />)
  }

  getButtonElement(): HTMLElement {
    const { getByTestId } = sut

    const FoundButtonElement = getByTestId("button")

    return FoundButtonElement
  }

  pressButton() {
    const ButtonElement = this.getButtonElement()

    fireEvent.click(ButtonElement)
  }
}

let sutSpy: SutSpy

describe("button", () => {
  beforeEach(() => {
    sut = render(<Sut text="Test" />)

    sutSpy = new SutSpy()
  })

  it("Should be able to receive a text props", () => {
    const buttonText = "BUTTON_TEXT"

    sutSpy.setButtonText(buttonText)

    const { getByText } = sut

    const ButtonTextElement = getByText(buttonText)

    expect(ButtonTextElement).toBeInTheDocument()
  })

  it("Should be able to call callback function when user press the button", () => {
    const callbackFunction = jest.fn()

    sutSpy.setClickCallbackFunction(callbackFunction)

    sutSpy.pressButton()

    expect(callbackFunction).toHaveBeenCalled()
  })
})
