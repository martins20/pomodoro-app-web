import styled, { css } from "styled-components"

import { ButtonType } from "."

type ContainerProps = {
  buttonType: ButtonType
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  border: none;

  background: var(--color-purple-500);

  padding: 0.625rem 1rem;

  color: var(--color-white);
  font-weight: 700;
  font-size: 1rem;

  text-transform: uppercase;

  border-radius: 4px;

  transition: all 0.3s;

  &:hover {
    background: var(--color-purple-600);
  }

  &:active {
    background: var(--color-purple-600);
  }

  ${({ buttonType }) =>
    buttonType === "outline" &&
    css`
      background: transparent;
      border: 0.3rem solid var(--color-white);

      &:hover {
        border-color: var(--color-purple-600);
      }

      &:active {
        border-color: var(--color-purple-600);
      }
    `}
`
