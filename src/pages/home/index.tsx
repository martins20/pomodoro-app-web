import { ChangeEvent, useState, useMemo, useCallback, useEffect } from "react"

import { Input, Sidebar, Timer, Todo } from "../../components"

import { useCollection } from "../../hooks"

import { Container, Content, TaskList } from "./styles"

export const Home = () => {
  const {
    selectedCollection,
    addTodoIntoCollection,
    deleteTodoFromCollection,
    toggleTodoCompleteFromCollection,
  } = useCollection()

  const [todoText, setTodoText] = useState("")
  const [isInputValid, setIsInputValid] = useState(true)

  const handleChangeTodoText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value)
    setIsInputValid(true)
  }, [])

  const getIsInputValid = useCallback((): boolean => !!todoText, [todoText])

  const handleAddTodo = useCallback(() => {
    addTodoIntoCollection({ name: todoText })

    setTodoText("")
  }, [todoText])

  const handleAddTodoByButton = useCallback(() => {
    const isvalidationValid = getIsInputValid()

    setIsInputValid(isvalidationValid)

    if (!isvalidationValid) return

    handleAddTodo()
  }, [getIsInputValid])

  const inCommingTodos = useMemo(
    () => selectedCollection?.todos.filter((todo) => !todo.isCompleted) || [],
    [selectedCollection],
  )
  const completedTodos = useMemo(
    () => selectedCollection?.todos.filter((todo) => todo.isCompleted) || [],
    [selectedCollection],
  )

  const IncommingTodos = useMemo(
    () => (
      <section>
        {inCommingTodos.map((todo) => (
          <Todo
            id={todo.id}
            key={todo.id}
            name={todo.name}
            data-test-id={todo.name}
            onDelete={() => deleteTodoFromCollection(todo.id)}
            onCheck={() => toggleTodoCompleteFromCollection(todo.id)}
            isCompleted={todo.isCompleted}
          />
        ))}
      </section>
    ),
    [inCommingTodos, selectedCollection],
  )

  const CompletedTodos = useMemo(
    () => (
      <section>
        {completedTodos.map((todo) => (
          <Todo
            id={todo.id}
            key={todo.id}
            name={todo.name}
            data-test-id={todo.name}
            onDelete={() => deleteTodoFromCollection(todo.id)}
            onCheck={() => toggleTodoCompleteFromCollection(todo.id)}
            isCompleted={todo.isCompleted}
          />
        ))}
      </section>
    ),
    [completedTodos, selectedCollection],
  )

  const shouldDisplayTodoContent = useMemo(() => !!selectedCollection, [selectedCollection])

  return (
    <>
      <Container data-testid="home">
        <Sidebar />

        <Timer />

        {shouldDisplayTodoContent && (
          <Content>
            <header>
              <Input
                value={todoText}
                onChange={handleChangeTodoText}
                onInputSubmit={handleAddTodo}
                isValueValid={isInputValid}
                placeholder="Add a task here"
                validation={{
                  message: "Todo name is required",
                  getInputValidation: getIsInputValid,
                }}
              />

              <button onClick={handleAddTodoByButton}>Add</button>
            </header>

            <TaskList hasCompletedTodo={!!completedTodos.length}>
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
          </Content>
        )}
      </Container>
    </>
  )
}
