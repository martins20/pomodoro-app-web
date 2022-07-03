import { FC, useState, HTMLAttributes } from "react"

import { Container, Checkbox, TodoName } from "./styles"

export type OnTodoCheck = (id: string) => void

export type TodoProps = {
  id: string
  name: string
  isCompleted: boolean
  onCheck: OnTodoCheck
} & HTMLAttributes<HTMLDivElement>

export const Todo: FC<TodoProps> = ({ id, name, onCheck, isCompleted, ...rest }) => {
  const [isChecked, setIsChecked] = useState(isCompleted)

  const handleCheckTodo = () => {
    setIsChecked((state) => !state)
    onCheck(id)
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
    </Container>
  )
}
