import styled from "styled-components"

export const Overlay = styled.section`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.5);

  position: absolute;
`

export const Container = styled.main`
  background: var(--color-gray-800);

  padding: 1rem;
  border-radius: 10px;

  width: 80%;
  height: 80%;

  max-width: 1000px;

  display: flex;
  flex-direction: column;

  & > header {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    justify-self: flex-start;

    margin-bottom: 0.5rem;

    button {
      line-height: 0;
      border: 0;
      padding: 0.2rem;
      border-radius: 2px;
      background: transparent;
    }
  }

  & > section {
    display: flex;
    flex-direction: column;

    flex: 1;

    align-items: center;
    justify-content: center;
  }
`
