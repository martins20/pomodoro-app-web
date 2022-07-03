import { fireEvent, render, RenderResult } from "@testing-library/react"
import { Todo, TodoProps } from "."

let sut: RenderResult

const mockTodo: TodoProps = {
  id: "TEST_ID",
  name: "Test",
  isCompleted: false,
  onCheck: jest.fn(),
}

describe("Todo", () => {
  beforeEach(() => {
    sut = render(<Todo {...mockTodo} />)
  })

  it("Should finish a todo by clicking into checkbox", () => {
    const { getByTestId, getByText } = sut

    const checkboxElement = getByTestId("checkbox")

    fireEvent.click(checkboxElement)

    const TodoNameElement = getByText(mockTodo.name)

    expect(mockTodo.onCheck).toHaveBeenCalledWith(mockTodo.id)
    expect(TodoNameElement).toHaveStyle({
      textDecoration: "line-through",
    })
  })
})
