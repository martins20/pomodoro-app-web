import styled, { css } from "styled-components"

type ContainerProps = {
  isCompleted: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;

  gap: 0.5rem;
  align-items: center;

  background: var(--color-gray-500);

  padding: 1rem;

  border-radius: 8px;

  & + div {
    margin-top: 0.5rem;
  }

  ${({ isCompleted }) =>
    isCompleted &&
    css`
      opacity: 0.5;

      > b {
        text-decoration: line-through;
      }
    `}
`

export const Checkbox = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1rem;
  height: 1rem;
  border: 0.1rem solid currentColor;
  border-radius: 0.4rem;
  transform: translateY(-0.075rem);

  display: grid;
  place-content: center;

  transition: border-color 0.05s;
  cursor: pointer;

  :before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    transform: scale(0);
    transition: 0.1s transform ease-in-out;
    box-shadow: inset 1em 1em var(--color-purple);

    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  :checked {
    border-color: var(--color-purple);

    :before {
      transform: scale(1);
    }
  }

  :hover {
    border-color: var(--color-purple);
  }

  :disabled {
    filter: brightness(0.5);
    cursor: not-allowed;
  }
`
export const TodoName = styled.b`
  font-size: 1rem;
`
