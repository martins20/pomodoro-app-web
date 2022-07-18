import { useMemo } from "react"

import { Icon } from "../icon"
import { useCollection, useModal } from "../../hooks"

import { Container, Header, Content, Collection, Footer } from "./styles"

import { CreateCollection } from "../forms/create-collection"

export const Sidebar = () => {
  const { toggleModalVisibility, setModalContent } = useModal()
  const { collections, selectedCollection, selectCollection, deleteCollection } = useCollection()

  const handleCreateNewCollection = () => {
    setModalContent(<CreateCollection />)

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

          <div
            aria-hidden="true"
            data-testid={`delete-collection_${collection.id}`}
            onClick={() => deleteCollection(collection.id)}
          >
            <Icon type="trash" size={16} />
          </div>
        </Collection>
      )),
    [collections, selectedCollection, deleteCollection],
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
