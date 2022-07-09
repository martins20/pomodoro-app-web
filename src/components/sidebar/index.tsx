import { useMemo, useState } from "react"
import { Icon } from "../icon"

import { Container, Header, Content, Footer } from "./styles"

export const Sidebar = () => {
  const [collections, setCollections] = useState<string[]>([])

  const Collections = useMemo(
    () => collections.map((collection) => <button>{collection}</button>),
    [collections],
  )

  return (
    <Container data-testid="sidebar">
      <Header>
        <b>Collections</b>
      </Header>

      <Content>{Collections}</Content>

      <Footer>
        <button
          onClick={() => {
            setCollections((state) => [...state, String(state.length + 1)])
          }}
        >
          Add a new collection
          <Icon type="add" size={16} />
        </button>
      </Footer>
    </Container>
  )
}
