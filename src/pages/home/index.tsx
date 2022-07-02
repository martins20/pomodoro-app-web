import { ChangeEvent, useState, KeyboardEvent, useMemo } from "react"
import { Container, Input } from "./styles"

export const Home = () => {
  const [todos, setTodos] = useState([""])
  const [todoText, setTodoText] = useState("")

  const handleChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value)
  }

  const handleAddTodo = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLocaleLowerCase() === "enter") setTodos((state) => [...state, todoText])
  }

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
        placeholder="Add a task here"
        value={todoText}
        onChange={handleChangeTodoText}
        onKeyUp={handleAddTodo}
      />

      {Todos}
    </Container>
  )
}
