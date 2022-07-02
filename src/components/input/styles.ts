import styled, { css } from "styled-components"

type InputProps = {
  isInvalid: boolean
}

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
`

export const Input = styled.input<InputProps>`
  border-radius: 5px;
  background: transparent;

  font-size: 1rem;

  padding: 0.8rem;

  border: 2px solid var(--color-gray-900);

  ${({ isInvalid }) =>
    isInvalid &&
    css`
      border-color: var(--color-red);
    `};
`

export const ValidationMessage = styled.small`
  margin-top: 0.1rem;
  font-weight: bold;
  font-size: 0.875rem;

  color: var(--color-red);
  line-height: 1.6;
  letter-spacing: 0.05rem;
`
