import { fireEvent, render, RenderResult } from "../../test/testing-library"

import { Sidebar as Sut } from "."
import { CollectionDTO } from "../../dtos"

let sut: RenderResult

const mockCollections: CollectionDTO[] = [
  {
    id: "collection-one",
    todos: [],
    name: "First collection",
    createdAt: new Date(),
  },
  {
    id: "collection-two",
    todos: [],
    name: "Second collection",
    createdAt: new Date(),
  },
]
let mockSelectedCollection: CollectionDTO | undefined
const mockSelectCollection = jest.fn().mockImplementation((collection_id: string) => {
  mockSelectedCollection = mockCollections.find((collection) => collection.id === collection_id)
})

const mockToggleModalVisibility = jest.fn().mockImplementation(() => false)

const mockDeleteCollection = jest.fn()

jest.mock("../../hooks", () => ({
  useModal: () => ({
    toggleModalVisibility: mockToggleModalVisibility,
    setModalContent: jest.fn(),
  }),
  useCollection: () => ({
    collections: mockCollections,
    selectCollection: mockSelectCollection,
    selectedCollection: mockSelectedCollection,
    deleteCollection: mockDeleteCollection,
  }),
}))

describe("Sidebar", () => {
  beforeEach(() => {
    sut = render(<Sut />)
  })

  it("Should render sidebar", () => {
    const { getByTestId } = sut

    const sideBarElement = getByTestId("sidebar")

    expect(sideBarElement).toBeInTheDocument()
  })

  it("Should select a collection when user clicks into some collection", () => {
    const { getByText } = sut

    const firstCollectionElement = getByText("Second collection")

    fireEvent.click(firstCollectionElement)

    expect(mockSelectCollection).toHaveBeenCalledWith("collection-two")
  })
})
