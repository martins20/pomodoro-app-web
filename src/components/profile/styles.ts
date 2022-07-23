import styled from "styled-components"

import { ProfileType } from "."

type ContainerProps = {
  type: ProfileType
}

export const Container = styled.a<ContainerProps>`
  > img {
    width: 60px;
    height: 60px;

    border-radius: 50%;
    border: 2px solid var(--color-purple-500);
  }
`
