import { ChangeEvent, useState, useMemo, useCallback } from "react"

import { Input, OnTodoCheck, Sidebar, Todo } from "../../components"
import { TodoDTO } from "../../dtos"

import { Container, TaskList } from "./styles"

export const Home = () => {
  const [todos, setTodos] = useState<TodoDTO[]>([
    {
      id: "1",
      name: "Agrupar os Todo's Completos",
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Fazer o componente de Sidebar",
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Quando o usuario clicar em uma seçao, mudar os Todo's com base na selecao do usuario",
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: "4",
      name: "Colocar a data de criaçao nos TODO's",
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

  const handleCompleteTodo: OnTodoCheck = (id) => {
    setTodos((state) =>
      state.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)),
    )
  }

  const Todos = useMemo(
    () =>
      todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          name={todo.name}
          onCheck={handleCompleteTodo}
          isCompleted={todo.isCompleted}
          data-test-id={todo.name}
        />
      )),
    [todos],
  )

  return (
    <Container data-testid="home">
      <Sidebar />

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
