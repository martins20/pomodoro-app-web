import { fireEvent, render, RenderResult } from "@testing-library/react"
import { Todo, TaskProps } from "."

let sut: RenderResult

const mockTodo: TaskProps = {
  name: "Test",
  isCompleted: false,
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

    expect(TodoNameElement).toHaveStyle({
      textDecoration: "line-through",
    })
  })
})
