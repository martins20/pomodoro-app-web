import { render } from "@testing-library/react"

import { Timer as Sut } from "."

describe("Timer", () => {
  it("Should be able to 'time to focus.' label if time is focus mode.", () => {
    const { getByText } = render(<Sut />)

    const FocustTextElement = getByText("time to focus")

    expect(FocustTextElement).toBeTruthy()
  })
})
