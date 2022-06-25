import { cleanup, render, RenderResult } from "@testing-library/react"

import { Timer as Sut, TimerMode, TimerProps } from "."

let sut: RenderResult

const makeSUT = (option?: TimerProps): RenderResult => {
  const sutResponse = render(<Sut {...option} />)

  return sutResponse
}

class SutSpy {
  setMode(mode: TimerMode): void {
    cleanup()

    sut = makeSUT({ mode })
  }
}

let sutSpy: SutSpy

describe("Timer", () => {
  beforeEach(() => {
    sut = makeSUT()
    sutSpy = new SutSpy()
  })

  it("Should be able to 'time to focus.' label if time is focus mode.", () => {
    const { getByText } = sut

    const FocusTextElement = getByText("time to focus")

    expect(FocusTextElement).toBeTruthy()
  })

  it("Should be able to 'get some rest' label if time is rest mode.", () => {
    sutSpy.setMode("rest")

    const { getByText } = sut

    const RestTextElement = getByText("get some rest")

    expect(RestTextElement).toBeTruthy()
  })
})
