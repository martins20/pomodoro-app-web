import styled, { css } from "styled-components"

type DefaultProps = {
  isInvalid: boolean
}

export const Container = styled.section<DefaultProps>`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-bottom: 0.875rem;

  small {
    ${({ isInvalid }) =>
      isInvalid &&
      css`
        margin: 0;
      `};
  }
`

export const Input = styled.input<DefaultProps>`
  border-radius: 5px;
  background: transparent;

  font-size: 1.2rem;

  padding: 0.8rem;

  border: 2px solid var(--color-gray-900);

  ${({ isInvalid }) =>
    isInvalid &&
    css`
      border-color: var(--color-red);
    `};
`

export const ValidationMessage = styled.small`
  font-weight: bold;
  font-size: 0.875rem;

  color: var(--color-red);
  line-height: 1.6;
  letter-spacing: 0.05rem;

  margin-bottom: 0.2rem;
`
