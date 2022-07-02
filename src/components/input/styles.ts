import styled, { css } from "styled-components"

type InputProps = {
  isInvalid: boolean
}

export const Container = styled.section``

export const Input = styled.input<InputProps>`
  color: black;

  border: 1px solid blue;

  ${({ isInvalid }) =>
    isInvalid &&
    css`
      border: 1px solid var(--color-red);
    `}
`

export const ValidationMessage = styled.span``
