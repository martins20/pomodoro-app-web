import { cleanup, render, RenderResult, fireEvent, waitFor } from "@testing-library/react"

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

  setRestTimer(time_in_minutes: number): void {
    cleanup()

    sut = makeSUT({ rest_time_in_minutes: time_in_minutes, mode: "rest" })
  }

  setFocusTimer(time_in_minutes: number): void {
    cleanup()

    sut = makeSUT({ focus_time_in_minutes: time_in_minutes, mode: "focus" })
  }

  getStartButton(): HTMLElement {
    const { getByText } = sut

    const foundStartButtonElement = getByText("Start")

    return foundStartButtonElement
  }

  getPauseButton(): HTMLElement {
    const { getByText } = sut

    const foundPauseButtonElement = getByText("Pause")

    return foundPauseButtonElement
  }

  pressStartButton(): void {
    const StartButtonElement = this.getStartButton()

    fireEvent.click(StartButtonElement)
  }

  pressPauseButton(): void {
    const PauseButtonElement = this.getPauseButton()

    fireEvent.click(PauseButtonElement)
  }
}

let sutSpy: SutSpy

describe("Timer", () => {
  beforeEach(() => {
    sut = makeSUT()
    sutSpy = new SutSpy()
  })

  afterEach(() => {
    cleanup()
  })

  it("Should be able to 'Focus time.' label if time is focus mode.", () => {
    const { getByText } = sut

    const FocusTextElement = getByText("Focus time")

    expect(FocusTextElement).toBeTruthy()
  })

  it("Should be able to 'Rest time' label if time is rest mode.", () => {
    sutSpy.setMode("rest")

    const { getByText } = sut

    const RestTextElement = getByText("Rest time")

    expect(RestTextElement).toBeTruthy()
  })

  it("Should be able to timer be 25 minutes by default in focus mode.", () => {
    const { getByText } = sut

    const MinutesElement = getByText("25:00")

    expect(MinutesElement).toBeTruthy()
  })

  it("Should be able to timer be 5 minutes by default in rest mode.", () => {
    sutSpy.setMode("rest")

    const { getByText } = sut

    const MinutesElement = getByText("05:00")

    expect(MinutesElement).toBeTruthy()
  })

  it("Should be able to set rest timer by props.", () => {
    sutSpy.setRestTimer(10)

    const { getByText } = sut

    const MinutesElement = getByText("10:00")

    expect(MinutesElement).toBeTruthy()
  })

  it("Should be able to set focus timer by props.", () => {
    sutSpy.setFocusTimer(10)

    const { getByText } = sut

    const MinutesElement = getByText("10:00")

    expect(MinutesElement).toBeTruthy()
  })

  it("Should be able to start timer count down when user press into start button", async () => {
    sutSpy.setFocusTimer(1)
    sutSpy.pressStartButton()

    const { findByText } = sut

    await waitFor(
      async () => {
        const CoundDownElement = await findByText("00:59")

        expect(CoundDownElement).toBeInTheDocument()
      },
      {
        timeout: 2000,
      },
    )
  })

  it("Should be able to toggle timer mode to rest when count down was equal to 0", async () => {
    sutSpy.setFocusTimer(0)
    sutSpy.pressStartButton()

    const { findByText } = sut

    await waitFor(
      async () => {
        const RestModeTextLabelElement = await findByText("Rest time")

        expect(RestModeTextLabelElement).toBeInTheDocument()
      },
      {
        timeout: 2000,
      },
    )
  })

  it("Should be able to toggle timer mode to focus when count down was equal to 0", async () => {
    sutSpy.setRestTimer(0)
    sutSpy.pressStartButton()

    const { findByText } = sut

    await waitFor(
      async () => {
        const RestModeTextLabelElement = await findByText("Focus time")

        expect(RestModeTextLabelElement).toBeInTheDocument()
      },
      {
        timeout: 2000,
      },
    )
  })

  it("Should pause count down when it is running", async () => {
    sutSpy.setFocusTimer(0)
    sutSpy.pressStartButton()

    const { findByText } = sut

    await waitFor(
      async () => {
        const StartButtonElement = await findByText("Start")

        expect(StartButtonElement).toBeInTheDocument()
      },
      {
        timeout: 3000,
      },
    )

    sutSpy.pressStartButton()

    await waitFor(
      async () => {
        const PauseButtonElement = await findByText("Pause")

        expect(PauseButtonElement).toBeInTheDocument()
      },
      {
        timeout: 2000,
      },
    )

    sutSpy.pressPauseButton()

    await waitFor(
      async () => {
        const StartButtonElement = await findByText("Start")

        expect(StartButtonElement).toBeInTheDocument()
      },
      {
        timeout: 2000,
      },
    )
  })
})
