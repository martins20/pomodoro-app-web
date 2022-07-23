import { Home as Sut } from "."
import { cleanup, fireEvent, render, RenderResult, waitFor } from "../../test/testing-library"

let sut: RenderResult

const makeSUT = (): RenderResult => render(<Sut />)

const todoId = 123412341234

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

  getTodoByName(name: string): HTMLElement | null {
    const { queryByText } = sut

    const TodoElement = queryByText(name)

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

  getByCollectionName(collectionName: string): HTMLElement | null {
    const { queryByText } = sut

    const collectionElement = queryByText(collectionName)

    return collectionElement
  }

  selectCollection(collectionName: string): void {
    const { getByText } = sut

    const collectionElement = getByText(collectionName)

    fireEvent.click(collectionElement)
  }

  addCollection(collectionName: string): void {
    const { getByText, getByPlaceholderText } = sut

    const addNewCollectionElement = getByText("Add a new collection")

    fireEvent.click(addNewCollectionElement)

    const collectionInputElement = getByPlaceholderText("Enter a collection name here")

    fireEvent.change(collectionInputElement, { target: { value: collectionName } })

    const addCollectionButtonElement = getByText("Add")

    fireEvent.click(addCollectionButtonElement)
  }
}

let sutSpy: SutSpy

describe("Home", () => {
  beforeEach(() => {
    sut = makeSUT()
    sutSpy = new SutSpy()
  })

  afterEach(() => {
    cleanup()
  })

  it("Should render home component", () => {
    const { getByTestId } = sut

    const ContainerElement = getByTestId("home")

    expect(ContainerElement).toBeInTheDocument()
  })

  it("Should create a new collection", async () => {
    const collectionName = "Collection One"

    sutSpy.addCollection(collectionName)

    await waitFor(async () => {
      const collectionElement = sutSpy.getByCollectionName(collectionName)

      expect(collectionElement).toBeInTheDocument()
    })
  })

  it("Should add a new TODO into selected collection", async () => {
    sutSpy.selectCollection("Collection One")

    const todoName = "Todo 01"

    sutSpy.addTodo(todoName)

    await waitFor(async () => {
      const todoElement = sutSpy.getTodoByName(todoName)

      expect(todoElement).toBeInTheDocument()
    })
  })

  it("Should add a new TODO into selected collection by pressing add button", async () => {
    sutSpy.selectCollection("Collection One")

    const todoName = "Todo 02"

    sutSpy.addTodoFromAddButton(todoName)

    await waitFor(async () => {
      const todoElement = sutSpy.getTodoByName(todoName)

      expect(todoElement).toBeInTheDocument()
    })
  })

  it("Should not add a todo with empty todo name", async () => {
    sutSpy.selectCollection("Collection One")

    await waitFor(async () => {
      const addTodoButton = sutSpy.getAddButton()

      fireEvent.click(addTodoButton)

      const { queryByText } = sut

      const validationTextElement = queryByText("Todo name is required")

      expect(validationTextElement).toBeInTheDocument()
    })
  })

  it("Should complete a todo from tasks section", async () => {
    sutSpy.selectCollection("Collection One")

    jest.spyOn(Date, "now").mockImplementationOnce(() => todoId)

    const todoName = "Todo 03"
    sutSpy.addTodoFromAddButton(todoName)

    const { getByTestId, queryByText } = sut
    const completeTodoCheckBoxElement = getByTestId(`checkbox_${todoId}`)

    fireEvent.click(completeTodoCheckBoxElement)

    await waitFor(async () => {
      const completedLabelElement = queryByText("Completed - 1")

      expect(completedLabelElement).toBeInTheDocument()
    })
  })

  it("Should complete a todo from completed section", async () => {
    sutSpy.selectCollection("Collection One")

    const { getByTestId, queryByText } = sut
    const completeTodoCheckBoxElement = getByTestId(`checkbox_${todoId}`)

    fireEvent.click(completeTodoCheckBoxElement)

    await waitFor(async () => {
      const completedLabelElement = queryByText("Completed - 1")

      expect(completedLabelElement).not.toBeInTheDocument()
    })
  })

  it("Should dete a todo from tasks section", async () => {
    sutSpy.selectCollection("Collection One")

    const { getByTestId, queryByText } = sut
    const deleteTodoButtonElement = getByTestId(`delete_${todoId}`)

    fireEvent.click(deleteTodoButtonElement)

    await waitFor(async () => {
      const todoElement = queryByText("Todo 03")

      expect(todoElement).not.toBeInTheDocument()
    })
  })

  it("Should delete a todo from tasks section", async () => {
    sutSpy.selectCollection("Collection One")

    const { getByTestId, queryByText } = sut

    jest.spyOn(Date, "now").mockImplementationOnce(() => todoId)

    const todoName = "Todo 03"
    sutSpy.addTodoFromAddButton(todoName)

    const completeTodoCheckBoxElement = getByTestId(`checkbox_${todoId}`)

    fireEvent.click(completeTodoCheckBoxElement)

    const deleteTodoButtonElement = getByTestId(`delete_${todoId}`)

    fireEvent.click(deleteTodoButtonElement)

    await waitFor(async () => {
      const todoElement = queryByText("Todo 03")

      expect(todoElement).not.toBeInTheDocument()
    })
  })
})
