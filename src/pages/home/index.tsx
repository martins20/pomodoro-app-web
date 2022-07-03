import { ChangeEvent, useState, useMemo, useCallback, useLayoutEffect } from "react"

import { TodoDTO } from "../../dtos"
import { LOCAL_STORAGE_TODO_KEY_NAME } from "../../constants"
import { Input, OnTodoCheck, OnTodoDelete, Sidebar, Todo } from "../../components"

import { Container, TaskList } from "./styles"
import { ReactIcons } from "../../services/icons/implementations/react-icon"

export const Home = () => {
  const [todos, setTodos] = useState<TodoDTO[]>([])
  const [todoText, setTodoText] = useState("")

  const handleChangeTodoText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value)
  }, [])

  const getIsInputValid = useCallback((): boolean => !!todoText, [todoText])

  const handleAddTodo = useCallback(() => {
    const newTodo = {
      id: Date.now().toString(),
      name: todoText,
      isCompleted: false,
      createdAt: new Date(),
    }

    const updatedTodos = [...todos, newTodo]

    setTodos(updatedTodos)
    setTodoText("")

    localStorage.setItem(LOCAL_STORAGE_TODO_KEY_NAME, JSON.stringify(updatedTodos))
  }, [todoText])

  const handleCompleteTodo: OnTodoCheck = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    )

    setTodos(updatedTodos)

    localStorage.setItem(LOCAL_STORAGE_TODO_KEY_NAME, JSON.stringify(updatedTodos))
  }

  const handleDeleteTodo: OnTodoDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)

    setTodos(updatedTodos)

    localStorage.setItem(LOCAL_STORAGE_TODO_KEY_NAME, JSON.stringify(updatedTodos))
  }

  const Todos = useMemo(
    () =>
      todos.map((todo) => (
        <Todo
          id={todo.id}
          key={todo.id}
          name={todo.name}
          data-test-id={todo.name}
          onDelete={handleDeleteTodo}
          onCheck={handleCompleteTodo}
          isCompleted={todo.isCompleted}
        />
      )),
    [todos],
  )

  useLayoutEffect(() => {
    const storagedTodos = localStorage.getItem(LOCAL_STORAGE_TODO_KEY_NAME)

    if (!storagedTodos) return

    const parsedStoragedTodos: TodoDTO[] = JSON.parse(storagedTodos)

    setTodos(parsedStoragedTodos)
  }, [])

  return (
    <Container data-testid="home">
      <Sidebar />

      {ReactIcons.getInstance().setIcon("trash")}

      <section>
        <header>
          <Input
            value={todoText}
            onChange={handleChangeTodoText}
            onInputSubmit={handleAddTodo}
            placeholder="Add a task here"
            validation={{
              message: "Todo name is required",
              getInputValidation: getIsInputValid,
            }}
          />
        </header>

        <TaskList>
          <h3>Tasks - {todos.length}</h3>

          {Todos}
        </TaskList>
      </section>
    </Container>
  )
}
