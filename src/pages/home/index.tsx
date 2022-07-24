import { ChangeEvent, useState, useMemo, useCallback } from "react"

import { Icon, Input, Sidebar, Timer, Todo } from "../../components"

import { useCollection } from "../../hooks"

import { CollectionInfo, Container, Content, TaskList } from "./styles"

export const Home = () => {
  const {
    deleteCollection,
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

  const unCompletedTodos = useMemo(
    () => selectedCollection?.todos.filter((todo) => !todo.isCompleted) || [],
    [selectedCollection],
  )

  const completedTodos = useMemo(
    () => selectedCollection?.todos.filter((todo) => todo.isCompleted) || [],
    [selectedCollection],
  )

  const collectionTodos = useMemo(
    () => [...unCompletedTodos, ...completedTodos],
    [unCompletedTodos, completedTodos],
  )

  const Todos = useMemo(
    () => (
      <section>
        {collectionTodos.map((todo) => (
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
    [selectedCollection],
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
              <CollectionInfo>
                <h1>{selectedCollection?.name}</h1>

                <button
                  onClick={async () => {
                    await deleteCollection(selectedCollection!.id)
                  }}
                >
                  <Icon type="trash" size={25} />
                </button>
              </CollectionInfo>

              <section>
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
              </section>
            </header>

            <TaskList>
              <header>
                <h3>
                  Todos <b>{collectionTodos.length}</b>
                </h3>
                <h3>
                  Completed
                  <b>{`${completedTodos.length} - ${collectionTodos.length}`}</b>
                </h3>
              </header>

              <div>{Todos}</div>
            </TaskList>
          </Content>
        )}
      </Container>
    </>
  )
}
