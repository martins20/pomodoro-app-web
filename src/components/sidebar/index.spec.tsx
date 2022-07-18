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

  it("Should add a new collection when user clicks on 'Add a new collection'", () => {
    const { getByText } = sut

    const addNewCollectionButtonElement = getByText("Add a new collection")

    fireEvent.click(addNewCollectionButtonElement)

    expect(mockToggleModalVisibility).toHaveBeenCalledTimes(1)
  })

  it("Should select a collection whe user clicks into some collection", () => {
    const { getByText } = sut

    const firstCollectionElement = getByText("First collection")

    fireEvent.click(firstCollectionElement)

    expect(mockSelectCollection).toHaveBeenCalledWith("collection-one")
  })

  it("Should delete a collection by clicking into tash button icon", () => {
    const { getByTestId } = sut

    const deleteCollectionButtonElement = getByTestId(`delete-collection_${mockCollections[0].id}`)
    fireEvent.click(deleteCollectionButtonElement)

    expect(mockDeleteCollection).toHaveBeenLastCalledWith(mockCollections[0].id)
  })
})
