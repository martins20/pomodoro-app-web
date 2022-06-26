import { ButtonHTMLAttributes, FC } from "react"

import { Container } from "./styles"

export type ButtonProps = {
  text: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ text, ...rest }) => (
  <Container data-testid="button" {...rest}>
    {text}
  </Container>
)
