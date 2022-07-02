import styled from "styled-components"

export const Container = styled.main`
  display: flex;
  flex-direction: column;

  padding: 0.5rem;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 0.5rem;
  }
`

export const TaskList = styled.article`
  display: flex;
  flex-direction: column;

  margin-top: 1.25rem;

  > h3 {
    margin-bottom: 1rem;
  }
`
