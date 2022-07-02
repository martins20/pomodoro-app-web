import { ChangeEvent, useState, useMemo, useCallback } from "react"

import { Input } from "../../components"

import { Container } from "./styles"

export const Home = () => {
  const [todos, setTodos] = useState([""])
  const [todoText, setTodoText] = useState("")

  const handleChangeTodoText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value)
  }, [])

  const getIsInputValid = useCallback((): boolean => !!todoText, [todoText])

  const handleAddTodo = useCallback(() => {
    setTodos((state) => [...state, todoText])
    setTodoText("")
  }, [todoText])

  const Todos = useMemo(
    () =>
      todos.map((todo) => (
        <h1 key={todo} data-testid={todo}>
          {todo}
        </h1>
      )),
    [todos],
  )

  return (
    <Container data-testid="home">
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

      {Todos}
    </Container>
  )
}
