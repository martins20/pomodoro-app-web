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

  addTodo(todoName: string): void {
    const inputElement = this.getInput()

    fireEvent.change(inputElement, { target: { value: todoName } })

    fireEvent.keyUp(inputElement, {
      key: "Enter",
    })
  }
}

let sutSpy: SutSpy

const dateSpy = jest.spyOn(Date, "now")

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
    sutSpy.addTodo("TODO 01")

    const todoElement = sutSpy.getTodoByName("TODO 01")

    expect(todoElement).toBeInTheDocument()
  })

  it("Should not be add a new todo with empty input value", () => {
    sutSpy.addTodo("")

    const { getByText } = sut

    const ValidationErrorMessageElement = getByText("Todo name is required")

    expect(ValidationErrorMessageElement).toBeInTheDocument()
  })

  it("Should complete a todo, by clicking into todo's checkbox", () => {
    const { getByTestId } = sut

    const todoId = 112341234

    dateSpy.mockImplementationOnce(() => todoId)

    sutSpy.addTodo("Todo 01")
    sutSpy.addTodo("Todo 02")

    const checkBoxTodoElement = getByTestId(`checkbox_${todoId}`)

    const todoElement = sutSpy.getTodoByName("Todo 01")

    fireEvent.click(checkBoxTodoElement)

    expect(todoElement).toHaveStyle({
      textDecoration: "line-through",
    })
  })
})
