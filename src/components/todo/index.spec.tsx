import { fireEvent, render, RenderResult } from "@testing-library/react"
import { Todo, TodoProps } from "."

let sut: RenderResult

const mockTodo: TodoProps = {
  id: "TEST_ID",
  name: "Test",
  isCompleted: false,
  onCheck: jest.fn(),
  onDelete: jest.fn(),
}

describe("Todo", () => {
  beforeEach(() => {
    sut = render(<Todo {...mockTodo} />)
  })

  it("Should finish a todo by clicking into checkbox", () => {
    const { getByTestId, getByText } = sut

    const checkboxElement = getByTestId(`checkbox_${mockTodo.id}`)

    fireEvent.click(checkboxElement)

    const TodoNameElement = getByText(mockTodo.name)

    expect(mockTodo.onCheck).toHaveBeenCalledWith(mockTodo.id)
    expect(TodoNameElement).toHaveStyle({
      textDecoration: "line-through",
    })
  })

  it("Should call onDelete when user clicks into trash icon", () => {
    const { getByTestId } = sut

    const deleteButtonElement = getByTestId(`delete_${mockTodo.id}`)

    fireEvent.click(deleteButtonElement)

    expect(mockTodo.onDelete).toHaveBeenCalledTimes(1)
  })
})
