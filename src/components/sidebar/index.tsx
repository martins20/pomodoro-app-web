import { useMemo } from "react"

import { useCollection } from "../../hooks"

import { Container, Header, Content, Collection } from "./styles"

// import { CreateCollection } from "../forms/create-collection"

export const Sidebar = () => {
  // const { toggleModalVisibility, setModalContent } = useModal()
  const { collections, selectedCollection, selectCollection, deleteCollection } = useCollection()

  // const handleCreateNewCollection = () => {
  //   setModalContent(<CreateCollection />)

  //   toggleModalVisibility()
  // }

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
    [collections, selectedCollection, deleteCollection],
  )

  return (
    <Container data-testid="sidebar">
      <Header>
        <h1>Collections</h1>
      </Header>

      <Content>{Collections}</Content>
    </Container>
  )
}
