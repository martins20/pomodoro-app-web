/* eslint-disable no-proto */
import { cleanup, fireEvent, render, RenderResult } from "@testing-library/react"
import { Home as Sut } from "."
import { LOCAL_STORAGE_TODO_KEY_NAME } from "../../constants"
import { TodoDTO } from "../../dtos"

const localStorageSetItemSpy = jest.spyOn(window.localStorage.__proto__, "setItem")
const localStorageGetItemSpy = jest
  .spyOn(window.localStorage.__proto__, "getItem")
  .mockImplementation(() => null)

let sut: RenderResult

const makeSUT = (): RenderResult => render(<Sut />)

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

  mockGetItemResponse(data: object[]) {
    cleanup()

    localStorageGetItemSpy.mockImplementationOnce(() => JSON.stringify(data))

    sut = makeSUT()
  }
}

let sutSpy: SutSpy

const dateSpy = jest.spyOn(Date, "now")

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

  it("Should save on local storage the todos when user create one", () => {
    const todoData = {
      id: 112341234,
      name: "Todo 01",
      isCompleted: false,
    }

    dateSpy.mockImplementationOnce(() => todoData.id)

    sutSpy.addTodo("Todo 01")

    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_TODO_KEY_NAME,
      expect.stringMatching(JSON.stringify([todoData])),
    )
  })

  it("Should get saved todos on localStorage when user open home page", () => {
    const todoData: TodoDTO = {
      id: "112341234",
      name: "Todo 01",
      isCompleted: false,
      createdAt: new Date(),
    }

    sutSpy.mockGetItemResponse([todoData])

    expect(localStorageGetItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_TODO_KEY_NAME)
  })
})
