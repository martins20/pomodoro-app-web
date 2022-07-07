import { FC, useState, HTMLAttributes } from "react"

import { Container, Checkbox, TodoName, TrashIcon } from "./styles"

export type OnTodoCheck = (id: string) => void
export type OnTodoDelete = (id: string) => void

export type TodoProps = {
  id: string
  name: string
  isCompleted: boolean
  onCheck: OnTodoCheck
  onDelete: OnTodoDelete
} & HTMLAttributes<HTMLDivElement>

export const Todo: FC<TodoProps> = ({ id, name, onCheck, onDelete, isCompleted, ...rest }) => {
  const [isChecked, setIsChecked] = useState(isCompleted)

  const handleCheckTodo = () => {
    setIsChecked((state) => !state)
    onCheck(id)
  }

  const handleDeleteTodo = () => {
    onDelete(id)
  }

  return (
    <Container isCompleted={isChecked} {...rest}>
      <Checkbox
        type="checkbox"
        data-testid={`checkbox_${id}`}
        checked={isChecked}
        onChange={handleCheckTodo}
      />

      <TodoName>{name}</TodoName>

      <button onClick={handleDeleteTodo} data-testid={`delete_${id}`}>
        <TrashIcon />
      </button>
    </Container>
  )
}
