import { ButtonHTMLAttributes, FC } from "react"

export type ButtonProps = {
  text: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ text }) => <h1>{text}</h1>
