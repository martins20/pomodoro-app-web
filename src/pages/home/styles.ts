import styled, { css } from "styled-components"
import { scrollbarCSS } from "../../styles"

type TaskListProps = {
  hasCompletedTodo: boolean
}

export const Container = styled.main`
  display: flex;
  flex-direction: row;

  height: 100%;
  overflow: hidden;

  align-items: center;
  justify-content: center;

  gap: 2rem;

  > section {
    flex: 1;
  }
`

export const Content = styled.section`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  height: 100%;

  > header {
    display: flex;
    align-items: flex-start;

    gap: 0.5rem;

    > button {
      background: transparent;
      border: 2px solid var(--color-white);

      padding: 0.7rem;

      font-size: 1.2rem;
      border-radius: 8px;

      transition: background, border-color 0.25s;

      :hover {
        background: var(--color-green);
        border-color: var(--color-green);
      }
    }
  }
`

export const TaskList = styled.article<TaskListProps>`
  display: flex;
  flex-direction: column;

  margin-bottom: 1rem;

  height: 100vh;

  overflow: auto;

  > div {
    padding-right: 0.5rem;

    > section {
      overflow-y: auto;
      max-height: 80vh;

      padding-right: 0.8rem;
    }

    & + div {
      margin: 1rem 0;
    }

    > h3 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    ${({ hasCompletedTodo }) =>
      hasCompletedTodo &&
      css`
        > section {
          max-height: 35vh;

          margin-bottom: 1rem;
        }
      `}
  }

  > div + div {
    ${({ hasCompletedTodo }) =>
      hasCompletedTodo &&
      css`
        > section {
          max-height: none;
        }
      `}
  }
`
