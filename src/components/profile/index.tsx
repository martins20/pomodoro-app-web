import { FC } from "react"
import { Container } from "./styles"

export type ProfileType = "small" | "large"

export type ProfileProps = {
  source: string
  type?: ProfileType
}

export const Profile: FC<ProfileProps> = ({ source, type = "small" }) => (
  <Container type={type} to="/profile">
    <img src={source} alt="Profile" />
  </Container>
)
