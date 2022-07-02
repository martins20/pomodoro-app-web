import { FC, useState, HTMLAttributes } from "react"

import { Container, Checkbox, TodoName } from "./styles"

export type TaskProps = {
  name: string
  isCompleted: boolean
} & HTMLAttributes<HTMLDivElement>

export const Todo: FC<TaskProps> = ({ name, isCompleted, ...rest }) => {
  const [isChecked, setIsChecked] = useState(isCompleted)

  return (
    <Container isCompleted={isChecked} {...rest}>
      <Checkbox
        type="checkbox"
        data-testid="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((state) => !state)}
      />
      <TodoName>{name}</TodoName>
    </Container>
  )
}
