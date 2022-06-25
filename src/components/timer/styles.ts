import styled, { css } from "styled-components"

type DefaultProps = {
  isFocusMode: boolean
}

export const Container = styled.section`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Label = styled.small<DefaultProps>`
  font-size: 1.5rem;
  font-weight: 700;

  color: var(--color-purple);

  ${({ isFocusMode }) =>
    !isFocusMode &&
    css`
      color: var(--color-green);
    `}
`
export const TimerText = styled.b<DefaultProps>`
  font-size: 2rem;

  color: var(--color-purple);

  ${({ isFocusMode }) =>
    !isFocusMode &&
    css`
      color: var(--color-green);
    `}
`
