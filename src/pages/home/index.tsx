import { ChangeEvent, useState, useMemo, useCallback, useLayoutEffect } from "react"

import { TodoDTO } from "../../dtos"
import { LOCAL_STORAGE_TODO_KEY_NAME } from "../../constants"
import { Input, OnTodoCheck, OnTodoDelete, Sidebar, Timer, Todo } from "../../components"

import { Container, TaskList } from "./styles"

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

  const handleCompleteTodo: OnTodoCheck = useCallback(
    (id: string) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      )

      setTodos(updatedTodos)

      localStorage.setItem(LOCAL_STORAGE_TODO_KEY_NAME, JSON.stringify(updatedTodos))
    },
    [todos],
  )

  const handleDeleteTodo: OnTodoDelete = useCallback(
    (id) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id)

      setTodos(updatedTodos)

      localStorage.setItem(LOCAL_STORAGE_TODO_KEY_NAME, JSON.stringify(updatedTodos))
    },
    [todos],
  )

  const inCommingTodos = useMemo(() => todos.filter((todo) => !todo.isCompleted), [todos])
  const completedTodos = useMemo(() => todos.filter((todo) => todo.isCompleted), [todos])

  const IncommingTodos = useMemo(
    () =>
      inCommingTodos.map((todo) => (
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
    [inCommingTodos],
  )

  const CompletedTodos = useMemo(
    () =>
      completedTodos.map((todo) => (
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
    [completedTodos],
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

      <Timer />

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
          <div>
            <h3>Tasks - {inCommingTodos.length}</h3>

            {IncommingTodos}
          </div>

          {!!completedTodos.length && (
            <div>
              <h3>Completed - {completedTodos.length} </h3>

              {CompletedTodos}
            </div>
          )}
        </TaskList>
      </section>
    </Container>
  )
}
