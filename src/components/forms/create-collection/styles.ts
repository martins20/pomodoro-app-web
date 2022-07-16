import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  flex: 1;

  > h1 {
    font-size: 2rem;
    align-self: center;

    margin-bottom: 2.5rem;
  }

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
`
