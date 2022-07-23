import { ButtonHTMLAttributes, FC } from "react"

import { Container } from "./styles"

export type ButtonType = "filled" | "outline"

export type ButtonProps = {
  text: string
  buttonType?: ButtonType
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ text, buttonType = "filled", ...rest }) => (
  <Container data-testid="button" {...rest} buttonType={buttonType}>
    {text}
  </Container>
)
