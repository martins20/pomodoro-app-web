import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  useLayoutEffect,
} from "react"
import { LOCAL_STORAGE_COLLECTION_KEY_NAME } from "../constants"

import { CollectionDTO, CreateCollectionDTO, CreateTodoDTO, TodoDTO } from "../dtos"

export type CollectionContextData = {
  collections: CollectionDTO[]
  selectedCollection?: CollectionDTO
  unSelectCollection: () => Promise<void>
  addTodoIntoCollection: (todo: CreateTodoDTO) => Promise<void>
  addNewCollection: (data: CreateCollectionDTO) => void
  deleteTodoFromCollection: (todo_id: TodoDTO["id"]) => Promise<void>
  deleteCollection: (collection_id: CollectionDTO["id"]) => Promise<void>
  selectCollection: (collection_id: CollectionDTO["id"]) => Promise<void>
  toggleTodoCompleteFromCollection: (todo_id: TodoDTO["id"]) => Promise<void>
}

export const CollectionContext = createContext<CollectionContextData>({} as CollectionContextData)

export const CollectionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [collections, setCollections] = useState<CollectionDTO[]>([])
  const [selectedCollection, setSelectedCollection] = useState<CollectionDTO | undefined>()

  const addNewCollection = useCallback(
    ({ name }: CreateCollectionDTO) => {
      const createdAt = Date.now()

      const collection: CollectionDTO = {
        id: createdAt.toString(),
        name,
        todos: [],
        createdAt: new Date(),
      }

      const updatedCollections = [...collections, collection]

      setCollections(updatedCollections)
      setSelectedCollection(collection)

      localStorage.setItem(LOCAL_STORAGE_COLLECTION_KEY_NAME, JSON.stringify(updatedCollections))
    },
    [collections],
  )

  const addTodoIntoCollection = useCallback(
    async (todo: CreateTodoDTO): Promise<void> => {
      if (!selectedCollection) throw new Error("Cannot add a todo without a selected collection")

      const updatedColectionWithNewTodo = {
        ...selectedCollection,
        todos: [
          ...selectedCollection.todos,
          { id: Date.now().toString(), name: todo.name, isCompleted: false, createdAt: new Date() },
        ],
      }

      setSelectedCollection(updatedColectionWithNewTodo)

      const updatedCollections = collections.map((collection) =>
        collection.id === selectedCollection.id ? updatedColectionWithNewTodo : collection,
      )

      setCollections(updatedCollections)

      localStorage.setItem(LOCAL_STORAGE_COLLECTION_KEY_NAME, JSON.stringify(updatedCollections))
    },
    [selectedCollection, collections],
  )

  const deleteTodoFromCollection = useCallback(
    async (todo_id: TodoDTO["id"]): Promise<void> => {
      if (!selectedCollection) throw new Error("Cannot delete a todo without a selected collection")

      const updatedColectionWithNewTodo = {
        ...selectedCollection,
        todos: selectedCollection.todos.filter((todo) => todo.id !== todo_id),
      }

      setSelectedCollection(updatedColectionWithNewTodo)

      const updatedCollections = collections.map((collection) =>
        collection.id === selectedCollection.id ? updatedColectionWithNewTodo : collection,
      )

      setCollections(updatedCollections)

      localStorage.setItem(LOCAL_STORAGE_COLLECTION_KEY_NAME, JSON.stringify(updatedCollections))
    },
    [selectedCollection, collections],
  )

  const toggleTodoCompleteFromCollection = useCallback(
    async (todo_id: TodoDTO["id"]): Promise<void> => {
      if (!selectedCollection) throw new Error("Cannot toggle todo complete without a selected collection")

      const updatedColectionWithNewTodo = {
        ...selectedCollection,
        todos: selectedCollection.todos.map((todo) =>
          todo.id === todo_id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
        ),
      }

      setSelectedCollection(updatedColectionWithNewTodo)

      const updatedCollections = collections.map((collection) =>
        collection.id === selectedCollection.id ? updatedColectionWithNewTodo : collection,
      )

      setCollections(updatedCollections)

      localStorage.setItem(LOCAL_STORAGE_COLLECTION_KEY_NAME, JSON.stringify(updatedCollections))
    },
    [selectedCollection, collections],
  )

  const selectCollection = useCallback(
    async (collection_id: CollectionDTO["id"]) => {
      const foundCollectionById = collections.find((collection) => collection.id === collection_id)

      if (!foundCollectionById) throw new Error("Cannot select a non-existent collection")

      setSelectedCollection(foundCollectionById)
    },
    [collections, setSelectedCollection],
  )

  const unSelectCollection = useCallback(async () => {
    if (!selectedCollection) throw new Error("Cannot unselect a collection without a selected one")

    setSelectedCollection(undefined)
  }, [selectedCollection])

  const deleteCollection = useCallback(
    async (collection_id: CollectionDTO["id"]): Promise<void> => {
      const foundCollection = collections.find((collection) => collection.id === collection_id)

      if (!foundCollection) throw new Error("Cannot delete a non-existent collection")

      const collectionsWithoutDeletedOne = collections.filter(
        (collection) => collection.id !== collection_id,
      )

      setCollections(collectionsWithoutDeletedOne)

      localStorage.setItem(
        LOCAL_STORAGE_COLLECTION_KEY_NAME,
        JSON.stringify(collectionsWithoutDeletedOne),
      )

      if (!selectedCollection) return

      if (selectedCollection.id === collection_id) setSelectedCollection(undefined)
    },
    [collections, selectedCollection, setSelectedCollection],
  )

  const collectionContextData = useMemo<CollectionContextData>(
    () => ({
      collections,
      deleteCollection,
      addNewCollection,
      selectCollection,
      selectedCollection,
      unSelectCollection,
      addTodoIntoCollection,
      deleteTodoFromCollection,
      toggleTodoCompleteFromCollection,
    }),
    [
      collections,
      addNewCollection,
      selectCollection,
      deleteCollection,
      unSelectCollection,
      selectedCollection,
      addTodoIntoCollection,
      setSelectedCollection,
    ],
  )

  useLayoutEffect(() => {
    const storagedCollections = localStorage.getItem(LOCAL_STORAGE_COLLECTION_KEY_NAME)

    if (!storagedCollections) return

    const parsedStoragedCollections: CollectionDTO[] = JSON.parse(storagedCollections)

    setCollections(parsedStoragedCollections)
  }, [])

  return (
    <CollectionContext.Provider value={collectionContextData}>
      {children}
    </CollectionContext.Provider>
  )
}
