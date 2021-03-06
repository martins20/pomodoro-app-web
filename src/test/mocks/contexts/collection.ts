import { CollectionContextData } from "../../../contexts/collection"
import { CreateCollectionDTO } from "../../../dtos"

const collections: CollectionContextData["collections"] = [
  {
    id: "1",
    name: "Collection One",
    todos: [{ id: "one", name: "Todo One", isCompleted: false, createdAt: new Date() }],
    createdAt: new Date(),
  },
]

export const mockCollectionContextData = {
  collections,
  addTodoIntoCollection: jest.fn(),
  addNewCollection: jest.fn().mockImplementation(({ name }: CreateCollectionDTO) => {
    const createdAt = new Date()

    const collection = {
      id: createdAt.toISOString(),
      name,
      todos: [],
      createdAt,
    }

    collections.push(collection)
  }),
  deleteTodoFromCollection: jest.fn(),
  selectCollection: {
    id: "1",
    name: "Collection One",
    todos: [{ id: "one", name: "Todo One", isCompleted: false, createdAt: new Date() }],
    createdAt: new Date(),
  },
  toggleTodoCompleteFromCollection: jest.fn(),
}
