import { fireEvent, render, RenderResult } from "@testing-library/react"
import { Home as Sut } from "."

let sut: RenderResult

class SutSpy {
  getInput(): HTMLElement {
    const { getByPlaceholderText } = sut

    const inputElement = getByPlaceholderText("Add a task here")

    return inputElement
  }

  getTodoByName(name: string): HTMLElement {
    const { getByText } = sut

    const TodoElement = getByText(name)

    return TodoElement
  }
}

let sutSpy: SutSpy

describe("Home", () => {
  beforeEach(() => {
    sut = render(<Sut />)
    sutSpy = new SutSpy()
  })

  it("Should render home component", () => {
    const { getByTestId } = sut

    const ContainerElement = getByTestId("home")

    expect(ContainerElement).toBeInTheDocument()
  })

  it("Should add a todo a new todo", () => {
    const InputElement = sutSpy.getInput()

    fireEvent.change(InputElement, { target: { value: "TODO 01" } })

    fireEvent.keyUp(InputElement, {
      key: "Enter",
    })

    const todoElement = sutSpy.getTodoByName("TODO 01")

    expect(todoElement).toBeInTheDocument()
  })

  it("Should not be add a new todo with empty input value", () => {
    const InputElement = sutSpy.getInput()

    fireEvent.change(InputElement, { target: { value: "" } })

    fireEvent.keyUp(InputElement, {
      key: "Enter",
    })

    const { getByText } = sut

    const ValidationErrorMessageElement = getByText("Todo name is required")

    expect(ValidationErrorMessageElement).toBeInTheDocument()
  })
})
