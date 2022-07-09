import styled from "styled-components"
import { scrollbarCSS } from "../../styles/styled-component"

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: 150px;
  background: var(--color-gray-500);

  height: 100vh;
`
export const Header = styled.header`
  display: flex;
  align-items: center;

  gap: 0.3rem;

  padding: 1rem;

  > b {
    font-size: 0.7rem;
    color: var(--white);
  }
`

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow-y: auto;

  > button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    border: 0;
    background: transparent;

    padding: 1rem;

    font-size: 0.875rem;

    transition: background 0.2s;
    text-transform: capitalize;

    &:hover {
      background: var(--color-gray-400);
    }
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
