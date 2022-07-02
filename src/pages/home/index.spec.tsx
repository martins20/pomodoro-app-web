import { fireEvent, render, RenderResult } from "@testing-library/react"
import { Home as Sut } from "."

let sut: RenderResult

class SutSpy {
  getInput(): HTMLElement {
    const { getByPlaceholderText } = sut

    const inputElement = getByPlaceholderText("Add a task here")

    return inputElement
  }

  getTodoById(id: string): HTMLElement {
    const { getByTestId } = sut

    const TodoElement = getByTestId(id)

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

    const todoElement = sutSpy.getTodoById("TODO 01")

    expect(todoElement).toBeInTheDocument()
  })
})
