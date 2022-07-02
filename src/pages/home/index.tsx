import { ChangeEvent, useState, useMemo, useCallback } from "react"

import { Input, Todo } from "../../components"
import { TodoDTO } from "../../dtos"

import { Container, TaskList } from "./styles"

export const Home = () => {
  const [todos, setTodos] = useState<TodoDTO[]>([
    {
      id: Date.now().toString(),
      name: "Finalizar o component de tarefa",
      isCompleted: false,
      createdAt: new Date(),
    },
  ])
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

    setTodos((state) => [...state, newTodo])
    setTodoText("")
  }, [todoText])

  const Todos = useMemo(
    () =>
      todos.map((todo) => (
        <Todo
          key={todo.id}
          name={todo.name}
          isCompleted={todo.isCompleted}
          data-test-id={todo.name}
        />
      )),
    [todos],
  )

  return (
    <Container data-testid="home">
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
    </Container>
  )
}
