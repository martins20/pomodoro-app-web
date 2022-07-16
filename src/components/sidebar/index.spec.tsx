import { fireEvent, render, RenderResult } from "../../test/testing-library"

import { Sidebar as Sut } from "."
import { CollectionDTO } from "../../dtos"

let sut: RenderResult

const mockCollections: CollectionDTO[] = []
let mockSelectedCollection: CollectionDTO | undefined
const mockSelectCollection = jest.fn().mockImplementation((collection_id: string) => {
  mockSelectedCollection = mockCollections.find((collection) => collection.id === collection_id)
})
const mockAddNewCollection = jest.fn().mockImplementation(() => {
  const mockCollectionPositionInString = String(mockCollections.length + 1)

  mockCollections.push({
    id: mockCollectionPositionInString,
    name: mockCollectionPositionInString,
    todos: [],
    createdAt: new Date(),
  })
})

jest.mock("../../hooks", () => ({
  ...jest.requireActual("../../hooks"),
  useCollection: () => ({
    collections: mockCollections,
    addNewCollection: mockAddNewCollection,
    selectCollection: mockSelectCollection,
    selectedCollection: mockSelectedCollection,
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

    expect(mockAddNewCollection).toHaveBeenCalledTimes(1)
  })

  it("Should select a collection whe user clicks into some collection", () => {
    const { getByText } = sut

    const addNewCollectionButtonElement = getByText("Add a new collection")

    fireEvent.click(addNewCollectionButtonElement)
    fireEvent.click(addNewCollectionButtonElement)

    const firstCollectionElement = getByText("1")

    fireEvent.click(firstCollectionElement)

    expect(mockSelectCollection).toHaveBeenCalledWith("1")
  })
})
