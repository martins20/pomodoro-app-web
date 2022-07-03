import styled from "styled-components"

export const Container = styled.button`
  display: flex;
  border: none;

  background: transparent;

  padding: 5px 10px;

  color: var(--color-purple);
  font-weight: 700;
  font-size: 2rem;

  text-transform: uppercase;

  border: 0.3rem solid var(--color-purple);
  border-radius: 8px;

  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.3;
  }
`
