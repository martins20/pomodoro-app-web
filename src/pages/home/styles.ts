import styled, { css } from "styled-components"

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
    justify-content: space-between;
    align-items: center;

    gap: 0.5rem;
  }
`

export const TaskList = styled.article<TaskListProps>`
  display: flex;
  flex-direction: column;

  margin-bottom: 1rem;

  > div {
    > section {
      overflow-y: auto;
      height: 90vh;
    }

    & + div {
      margin-top: 2rem;
    }

    > h3 {
      margin-bottom: 1rem;
    }

    ${({ hasCompletedTodo }) =>
      hasCompletedTodo &&
      css`
        > section {
          height: 40vh;
        }
      `}
  }
`
