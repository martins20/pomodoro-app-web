import { Home as Sut } from "."
import { fireEvent, render, RenderResult } from "../../test/testing-library"

import { mockModalContextData } from "../../test/mocks/contexts/modal"
import { mockCollectionContextData } from "../../test/mocks/contexts/collection"

let sut: RenderResult

const makeSUT = (): RenderResult => render(<Sut />)

class SutSpy {
  getInput(): HTMLElement {
    const { getByPlaceholderText } = sut

    const inputElement = getByPlaceholderText("Add a task here")

    return inputElement
  }

  getAddButton(): HTMLElement {
    const { getByText } = sut

    const addButtonElement = getByText("Add")

    return addButtonElement
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

  addTodoFromAddButton(todoName: string): void {
    const inputElement = this.getInput()

    fireEvent.change(inputElement, { target: { value: todoName } })

    const addButtonElement = this.getAddButton()

    fireEvent.click(addButtonElement)
  }
}

let sutSpy: SutSpy

describe("Home", () => {
  beforeEach(() => {
    sut = makeSUT()
    sutSpy = new SutSpy()
  })

  it("Should render home component", () => {
    const { getByTestId } = sut

    const ContainerElement = getByTestId("home")

    expect(ContainerElement).toBeInTheDocument()
  })

  it("Should call a context method for create a new collection", async () => {
    const { getByText } = sut

    const addNewCollectionElement = getByText("Add a new collection")

    mockModalContextData.toggleModalVisibility.mockImplementationOnce(() => {
      mockCollectionContextData.addNewCollection({
        name: "Collection One",
      })
    })

    fireEvent.click(addNewCollectionElement)

    expect(mockModalContextData.toggleModalVisibility).toHaveBeenCalledTimes(1)
  })
})
