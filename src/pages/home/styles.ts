import styled from "styled-components"

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
    flex-direction: column;

    > section {
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
  }
`

export const CollectionInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 0.5rem;

  margin-bottom: 30px;

  > h1 {
    font-size: 1.5rem;
  }

  > button {
    border: 0;
    background: transparent;

    > svg > path {
      color: var(--color-red);
    }
  }
`

export const TaskList = styled.article`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;

  height: 100vh;

  overflow: auto;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 0.5rem;

    margin-bottom: 0.25rem;

    > h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      font-size: 1rem;
      font-weight: 400;
      line-height: 1.9;

      > b {
        display: flex;
        align-items: center;
        justify-content: center;

        background: var(--color-gray-400);
        padding: 0.5rem;
        font-size: 0.875rem;
        line-height: 0.5rem;

        border-radius: 10px;
      }
    }
  }

  > div {
    padding-right: 0.5rem;

    > section {
      overflow-y: auto;
    }

    & + div {
      margin: 1rem 0;
    }

    > h3 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
  }
`
