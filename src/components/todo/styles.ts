import styled, { css } from "styled-components"

import { Icon } from "../icon"

type ContainerProps = {
  isCompleted: boolean
}

export const Container = styled.section<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;
  align-items: center;

  background: var(--color-gray-500);

  padding: 1rem;

  border-radius: 8px;

  & + & {
    margin-top: 0.8rem;
  }

  ${({ isCompleted }) =>
    isCompleted &&
    css`
      opacity: 0.5;

      b {
        text-decoration: line-through;
      }
    `}

  > button {
    border: 0;
    line-height: 0;
    background: transparent;
    margin: 0;

    > svg path {
      color: var(--color-red);
    }
  }
`

export const Checkbox = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.25rem;
  height: 1.25rem;

  min-width: 1.25rem;
  min-height: 1.25rem;
  border: 2px solid var(--color-purple-500);
  border-radius: 4px;
  transform: translateY(-0.075rem);

  display: grid;
  place-content: center;

  transition: border-color 0.05s;
  cursor: pointer;

  :before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;

    background: transparent;
  }

  :checked {
    border-color: var(--color-purple-600);

    :before {
      background: var(--color-purple-600);
    }
  }

  :disabled {
    filter: grayscale(1);
    cursor: not-allowed;
  }
`
export const TodoName = styled.b`
  width: 100%;

  font-size: 1rem;

  text-align: justify;
  line-height: 1.9;
`

export const TrashIcon = styled(Icon).attrs({
  type: "trash",
  size: 20,
})``
