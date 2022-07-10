import { useMemo } from "react"
import { useCollection } from "../../hooks"
import { Icon } from "../icon"

import { Container, Header, Content, Collection, Footer } from "./styles"

export const Sidebar = () => {
  const { collections, addNewCollection, selectedCollection, selectCollection } = useCollection()

  const Collections = useMemo(
    () =>
      collections.map((collection) => (
        <Collection
          key={collection.id}
          isSelected={collection.id === selectedCollection?.id}
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
        <button
          onClick={() => {
            addNewCollection({
              name: "Qualquer nome",
            })
          }}
        >
          Add a new collection
          <Icon type="add" size={16} />
        </button>
      </Footer>
    </Container>
  )
}
