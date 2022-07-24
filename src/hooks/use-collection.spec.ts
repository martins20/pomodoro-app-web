import { renderHook, RenderHookResult, act, waitFor, cleanup } from "@testing-library/react"
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
  // afterEach(() => {
  //   cleanup()
  // })

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

  it("Should delete an existent collection", async () => {
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
})
