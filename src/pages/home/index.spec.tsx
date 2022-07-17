import { Home as Sut } from "."
import { cleanup, fireEvent, render, RenderResult, waitFor } from "../../test/testing-library"

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
    const collectionName = "Collection One"

    sutSpy.addCollection(collectionName)

    const todoName = "Todo 01"

    sutSpy.addTodo(todoName)

    await waitFor(async () => {
      const todoElement = sutSpy.getTodoByName(todoName)

      expect(todoElement).toBeInTheDocument()
    })
  })

  it("Should add a new TODO into selected collection by pressing add button", async () => {
    const collectionName = "Collection One"

    sutSpy.addCollection(collectionName)

    const todoName = "Todo 01"

    sutSpy.addTodoFromAddButton(todoName)

    await waitFor(async () => {
      const todoElement = sutSpy.getTodoByName(todoName)

      expect(todoElement).toBeInTheDocument()
    })
  })
})
