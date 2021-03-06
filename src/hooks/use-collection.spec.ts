import { renderHook, RenderHookResult, act, cleanup } from "@testing-library/react"
import { LOCAL_STORAGE_COLLECTION_KEY_NAME } from "../constants"

import { CollectionContextData, CollectionProvider } from "../contexts/collection"

import { useCollection as useSut } from "./use-collection"

type SutResponse = RenderHookResult<CollectionContextData, object>

const makeSut = async () => {
  cleanup()

  let sut: SutResponse = {} as SutResponse

  await act(async () => {
    sut = renderHook(() => useSut(), {
      wrapper: CollectionProvider,
    })
  })

  return sut
}

const localStorageGetItemSpy = jest.spyOn(Storage.prototype, "getItem")
const localStorageSetItemSpy = jest.spyOn(Storage.prototype, "setItem")

const dateNowSpy = jest.spyOn(Date, "now")

describe("useCollection", () => {
  it("Should call local storage for search a storaged collection", async () => {
    const { result } = await makeSut()

    expect(result.current.collections).toHaveLength(0)
    expect(localStorageGetItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_COLLECTION_KEY_NAME)
  })

  it("Should set storaged collections saved into local storage", async () => {
    const mockCollection = {
      id: "some-id",
      name: "Mock Collection",
      todos: [],
    }

    localStorageGetItemSpy.mockReturnValueOnce(JSON.stringify([mockCollection]))

    const { result } = await makeSut()

    expect(result.current.collections[0]).toEqual(expect.objectContaining(mockCollection))
    expect(localStorageGetItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_COLLECTION_KEY_NAME)
  })

  it("Should create a new collection", async () => {
    const { result } = await makeSut()

    const collectionName = "Jonh Collection"

    await act(async () => {
      result.current.addNewCollection({ name: collectionName })
    })

    expect(result.current.collections[0]).toEqual(
      expect.objectContaining({
        name: collectionName,
        todos: [],
      }),
    )

    expect(result.current.selectedCollection).toBeTruthy()
    expect(result.current.selectedCollection?.name).toBe(collectionName)

    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_COLLECTION_KEY_NAME,
      JSON.stringify(result.current.collections),
    )
  })

  it("Should delete the selected collection", async () => {
    const collectionID = 1

    const { result } = await makeSut()

    const collectionName = "Jonh Collection Two"
    dateNowSpy.mockReturnValueOnce(collectionID)

    await act(async () => {
      result.current.addNewCollection({ name: collectionName })
    })

    await act(async () => {
      await result.current.deleteCollection(collectionID.toString())
    })

    expect(result.current.collections).toHaveLength(1)
    expect(result.current.selectedCollection).toBeFalsy()
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_COLLECTION_KEY_NAME,
      JSON.stringify(result.current.collections),
    )
  })

  it("Should not be able to delete non existent collection", async () => {
    const { result } = await makeSut()

    await expect(result.current.deleteCollection("non-existent-collection-id")).rejects.toThrow(
      "Cannot delete a non-existent collection",
    )
  })

  it("Should delete a collection", async () => {
    const { result } = await makeSut()

    await act(async () => {
      result.current.deleteCollection(result.current.collections[0].id)
    })

    expect(result.current.collections).toHaveLength(0)
    expect(result.current.selectedCollection).toBeFalsy()
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_COLLECTION_KEY_NAME,
      JSON.stringify(result.current.collections),
    )
  })

  it("Should not be able to select a non existent collection", async () => {
    const { result } = await makeSut()

    await expect(result.current.selectCollection("non-existent-collection-id")).rejects.toThrow(
      "Cannot select a non-existent collection",
    )
  })

  it("Should not be able to unselect a collection without a selected one", async () => {
    const { result } = await makeSut()

    expect(result.current.unSelectCollection()).rejects.toThrow(
      "Cannot unselect a collection without a selected one",
    )
  })

  it("Should select a collection", async () => {
    const { result } = await makeSut()

    await act(async () => {
      result.current.addNewCollection({ name: "Collection One" })
    })

    await act(async () => {
      result.current.addNewCollection({ name: "Collection Two" })
    })

    await act(async () => {
      await result.current.selectCollection(result.current.collections[0].id)
    })

    expect(result.current.selectedCollection).toBeTruthy()
    expect(result.current.selectedCollection?.name).toBe("Collection One")
  })

  it("Should unselect a selected collection", async () => {
    const { result } = await makeSut()

    await act(async () => {
      await result.current.selectCollection(result.current.collections[0].id)
    })

    await act(async () => {
      await result.current.unSelectCollection()
    })

    expect(result.current.selectedCollection).toBeFalsy()
  })

  it("Should not add a todo without a seleted collection", async () => {
    const { result } = await makeSut()

    expect(result.current.addTodoIntoCollection({ name: "Some TODO" })).rejects.toThrow(
      "Cannot add a todo without a selected collection",
    )
  })

  it("Should create a new TODO into selected collection", async () => {
    const { result } = await makeSut()

    const todoId = 1
    const todoName = "A simple TODO"

    await act(async () => {
      await result.current.selectCollection(result.current.collections[0].id)
    })

    dateNowSpy.mockReturnValueOnce(todoId)

    await act(async () => {
      await result.current.addTodoIntoCollection({ name: todoName })
    })

    expect(result.current.selectedCollection?.todos[0]).toEqual(
      expect.objectContaining({
        name: todoName,
        isCompleted: false,
      }),
    )
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_COLLECTION_KEY_NAME,
      JSON.stringify(result.current.collections),
    )
  })

  it("Should not be able to complete a todo without a selected collection", async () => {
    const { result } = await makeSut()

    expect(result.current.toggleTodoCompleteFromCollection("1")).rejects.toThrow(
      "Cannot toggle todo complete without a selected collection",
    )
  })

  it("Should complete a todo from selected collection", async () => {
    const { result } = await makeSut()

    await act(async () => {
      await result.current.selectCollection(result.current.collections[0].id)
    })

    await act(async () => {
      await result.current.toggleTodoCompleteFromCollection("1")
    })

    expect(result.current.selectedCollection?.todos[0]).toEqual(
      expect.objectContaining({
        isCompleted: true,
      }),
    )
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_COLLECTION_KEY_NAME,
      JSON.stringify(result.current.collections),
    )
  })

  it("Should not complete any todo if todo_id was not found", async () => {
    const { result } = await makeSut()

    await act(async () => {
      await result.current.selectCollection(result.current.collections[0].id)
    })

    await act(async () => {
      await result.current.toggleTodoCompleteFromCollection("non-existent-todo-id")
    })

    expect(result.current.selectedCollection?.todos[0]).toEqual(
      expect.objectContaining({
        isCompleted: true,
      }),
    )
  })

  it("Should not be able to delete a todo without a selected collection", async () => {
    const { result } = await makeSut()

    expect(result.current.deleteTodoFromCollection("1")).rejects.toThrow(
      "Cannot delete a todo without a selected collection",
    )
  })

  it("Should delete a todo from selected collection", async () => {
    const { result } = await makeSut()

    await act(async () => {
      await result.current.selectCollection(result.current.collections[0].id)
    })

    await act(async () => {
      await result.current.deleteTodoFromCollection("1")
    })

    expect(result.current.selectedCollection?.todos).toHaveLength(0)
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_COLLECTION_KEY_NAME,
      JSON.stringify(result.current.collections),
    )
  })
})
