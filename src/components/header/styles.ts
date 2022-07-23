import styled from "styled-components"

export const Container = styled.header`
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 1rem 2rem;
  background: var(--color-gray-500);
  border-bottom: 1px solid var(--color-gray-800);

  > a {
    text-decoration: none;

    > h1 {
      font-size: 1.5rem;

      > b {
        color: var(--color-purple-600);
      }
    }
  }

  > nav {
    display: flex;
    align-items: center;

    gap: 1rem;
  }
`
