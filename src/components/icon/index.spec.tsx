import { cleanup, render, RenderResult } from "../../test/testing-library"

import { Icon as Sut } from "."
import { IconName } from "../../services/contracts"

let sut: RenderResult

class SutSpy {
  setIcon(type: IconName) {
    cleanup()

    sut = render(<Sut type={type} size={20} />)
  }
}

let sutSpy: SutSpy

describe("Icon", () => {
  beforeEach(() => {
    sut = render(<Sut type="trash" size={20} data-testid="icon" />)
    sutSpy = new SutSpy()
  })

  it("Should be able to render an icon", () => {
    const { getByTestId } = sut

    const IconElement = getByTestId("icon")

    expect(IconElement).toBeInTheDocument()
  })
})
