import { Link } from "react-router-dom"
import styled from "styled-components"

import { ProfileType } from "."

type ContainerProps = {
  type: ProfileType
}

export const Container = styled(Link)<ContainerProps>`
  > img {
    width: 50px;
    height: 50px;

    border-radius: 50%;
    border: 1.5px solid var(--color-purple-500);
  }
`
