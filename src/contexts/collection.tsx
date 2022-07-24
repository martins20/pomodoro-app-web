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
  addTodoIntoCollection: (todo: CreateTodoDTO) => void
  addNewCollection: (data: CreateCollectionDTO) => void
  deleteTodoFromCollection: (todo_id: TodoDTO["id"]) => void
  deleteCollection: (collection_id: CollectionDTO["id"]) => void
  selectCollection: (collection_id: CollectionDTO["id"]) => void
  toggleTodoCompleteFromCollection: (todo_id: TodoDTO["id"]) => void
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
    (todo: CreateTodoDTO): void => {
      if (!selectedCollection) throw new Error("Cannot add a todo without an collection")

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
    (todo_id: TodoDTO["id"]): void => {
      if (!selectedCollection) throw new Error("Cannot add a todo without an collection")

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
    (todo_id: TodoDTO["id"]): void => {
      if (!selectedCollection) throw new Error("Cannot add a todo without an collection")

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
    (collection_id: CollectionDTO["id"]) => {
      const foundCollectionById = collections.find((collection) => collection.id === collection_id)

      if (!foundCollectionById) throw new Error("Cannot select a non-existent collention")

      setSelectedCollection(foundCollectionById)
    },
    [collections, setSelectedCollection],
  )

  const deleteCollection = useCallback(
    (collection_id: CollectionDTO["id"]): void => {
      console.log({ collection_id })

      const foundCollection = collections.find((collection) => collection.id === collection_id)

      if (!foundCollection) throw new Error("Cannot delete a non-existent collection")

      const collectionsWithoutDeletedOne = collections.filter(
        (collection) => collection.id !== collection_id,
      )

      setCollections(collectionsWithoutDeletedOne)

      if (!selectedCollection) return

      if (selectedCollection.id === collection_id) setSelectedCollection(undefined)

      localStorage.setItem(
        LOCAL_STORAGE_COLLECTION_KEY_NAME,
        JSON.stringify(collectionsWithoutDeletedOne),
      )
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
      addTodoIntoCollection,
      deleteTodoFromCollection,
      toggleTodoCompleteFromCollection,
    }),
    [
      collections,
      addNewCollection,
      selectCollection,
      deleteCollection,
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
