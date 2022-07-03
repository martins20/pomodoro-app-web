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

export const Label = styled.h1<DefaultProps>`
  font-size: 3rem;
  font-weight: 700;

  color: var(--color-purple);

  ${({ isFocusMode }) =>
    !isFocusMode &&
    css`
      color: var(--color-green);
    `}
`
export const TimerText = styled.b<DefaultProps>`
  font-size: 4rem;

  color: var(--color-purple);

  ${({ isFocusMode }) =>
    !isFocusMode &&
    css`
      color: var(--color-green);
    `}
`
