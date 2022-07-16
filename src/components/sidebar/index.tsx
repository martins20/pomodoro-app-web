import { useMemo } from "react"

import { Icon } from "../icon"
import { useCollection, useModal } from "../../hooks"

import { Container, Header, Content, Collection, Footer } from "./styles"

export const Sidebar = () => {
  const { toggleModalVisibility, setModalContent } = useModal()
  const { collections, selectedCollection, selectCollection } = useCollection()

  const handleCreateNewCollection = () => {
    setModalContent(
      <div>
        <h1>Hello World From Sidebar</h1>

        <input type="text" />
      </div>,
    )

    toggleModalVisibility()
  }

  const Collections = useMemo(
    () =>
      collections.map((collection) => (
        <Collection
          key={collection.id}
          isSelected={selectedCollection?.id === collection.id}
          onClick={() => selectCollection(collection.id)}
        >
          {collection.name}
        </Collection>
      )),
    [collections, selectedCollection],
  )

  return (
    <Container data-testid="sidebar">
      <Header>
        <b>Collections</b>
      </Header>

      <Content>{Collections}</Content>

      <Footer>
        <button onClick={handleCreateNewCollection}>
          Add a new collection
          <Icon type="add" size={16} />
        </button>
      </Footer>
    </Container>
  )
}
