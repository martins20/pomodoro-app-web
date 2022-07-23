import styled, { css } from "styled-components"

type CollectionProps = {
  isSelected: boolean
}

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: 200px;
  background: var(--color-gray-500);

  height: 100vh;
  border: 1px solid var(--color-gray-800);
`
export const Header = styled.header`
  display: flex;
  align-items: center;

  gap: 0.3rem;

  padding: 1rem;

  margin-bottom: 1.5rem;

  > h1 {
    font-size: 1.2rem;
    color: var(--color-purple-600);
  }
`

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  overflow-y: auto;
`

export const Collection = styled.button<CollectionProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;

  border: 0;
  background: transparent;
  border-radius: 8px;

  padding: 1rem;

  font-size: 0.875rem;

  transition: background 0.2s;
  text-transform: capitalize;

  &:hover {
    background: var(--color-gray-400);
  }

  &:active {
    background: var(--color-purple-600);
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: var(--color-purple-600);

      &:hover {
        background: var(--color-purple-600);
      }
    `}

  & + button {
    margin-top: 0.8rem;
  }
`

export const Footer = styled.footer`
  display: flex;

  align-items: center;

  padding: 1rem;

  > button {
    display: flex;
    align-items: center;

    gap: 0.2rem;

    border: 0;

    background: transparent;
    font-size: 1rem;

    transition: color 0.1s;

    path {
      transition: color 0.1s;
    }

    :hover {
      color: var(--color-green);

      path {
        color: var(--color-green);
      }
    }
  }
`
