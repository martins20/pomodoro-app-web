import { renderHook, RenderHookResult, act } from "@testing-library/react"
import { LOCAL_STORAGE_COLLECTION_KEY_NAME } from "../constants"

import { CollectionContextData, CollectionProvider } from "../contexts/collection"

import { useCollection as useSut } from "./use-collection"

type SutResponse = RenderHookResult<CollectionContextData, object>

const makeSut = async () => {
  let sut: SutResponse = {} as SutResponse

  await act(async () => {
    sut = renderHook(() => useSut(), {
      wrapper: CollectionProvider,
    })
  })

  return sut
}

const localStorageGetItemSpy = jest.spyOn(Storage.prototype, "getItem")

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
})
