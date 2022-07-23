import { Link } from "react-router-dom"

import { Button } from "../button"
import { Profile } from "../profile"
import { CreateCollection } from "../forms/create-collection"

import { useModal } from "../../hooks"

import { Container } from "./styles"

export const Header = () => {
  const { toggleModalVisibility, setModalContent } = useModal()

  const handleCreateNewCollection = () => {
    setModalContent(<CreateCollection />)

    toggleModalVisibility()
  }

  return (
    <Container>
      <Link to="/">
        <h1>
          Pomodoro <b>App</b>
        </h1>
      </Link>

      <nav>
        <Button text="New Collection" onClick={handleCreateNewCollection} />
        <Profile source="https://www.github.com/martins20.png" />
      </nav>
    </Container>
  )
}
