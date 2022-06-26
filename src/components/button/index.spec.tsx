import { cleanup, render, RenderResult } from "@testing-library/react"

import { Button as Sut } from "."

let sut: RenderResult

class SutSpy {
  setButtonText(text: string) {
    cleanup()

    sut = render(<Sut text={text} />)
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
})
