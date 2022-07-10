import { createContext, FC, PropsWithChildren, useCallback, useMemo, useState } from "react"

import { CollectionDTO, CreateCollectionDTO } from "../dtos"

export type CollectionContextData = {
  collections: CollectionDTO[]
  selectedCollection?: CollectionDTO
  selectCollection: (collection_id: CollectionDTO["id"]) => void
  addNewCollection: (data: CreateCollectionDTO) => void
}

export const CollectionContext = createContext<CollectionContextData>({} as CollectionContextData)

export const CollectionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [collections, setCollections] = useState<CollectionDTO[]>([])
  const [selectedCollection, setSelectedCollection] = useState<CollectionDTO | undefined>()

  const addNewCollection = useCallback(({ name }: CreateCollectionDTO) => {
    const createdAt = new Date()

    const collection: CollectionDTO = {
      id: createdAt.toISOString(),
      name,
      todos: [],
      createdAt,
    }

    setCollections((state) => [...state, collection])
    setSelectedCollection(collection)
  }, [])

  const selectCollection = useCallback(
    (collection_id: CollectionDTO["id"]) => {
      const foundCollectionById = collections.find((collection) => collection.id === collection_id)

      if (!foundCollectionById) throw new Error("Cannot select a non-existent collention")

      setSelectedCollection(foundCollectionById)
    },
    [collections, setSelectedCollection],
  )

  const collectionContextData = useMemo<CollectionContextData>(
    () => ({
      collections,
      addNewCollection,
      selectCollection,
      selectedCollection,
    }),
    [collections, addNewCollection, selectCollection, selectedCollection],
  )

  return (
    <CollectionContext.Provider value={collectionContextData}>
      {children}
    </CollectionContext.Provider>
  )
}
