import { CreateCollection as Sut } from "."
import { CreateCollectionDTO } from "../../../dtos"
import { render, RenderResult, fireEvent } from "../../../test/testing-library"

let sut: RenderResult

const mockToggleModalVisibility = jest.fn()
const mockAddNewCollection = jest.fn().mockImplementation((data: CreateCollectionDTO) => data)

jest.mock("../../../hooks", () => ({
  useModal: () => ({
    toggleModalVisibility: mockToggleModalVisibility,
  }),
  useCollection: () => ({
    addNewCollection: mockAddNewCollection,
  }),
}))

describe("form Create collection", () => {
  beforeEach(() => {
    sut = render(<Sut />)
  })

  it("Should create a new collection", () => {
    const { getByPlaceholderText, getByText } = sut

    const addButtonElement = getByText("Add")
    const inputElement = getByPlaceholderText("Enter a collection name here")

    const collectionName = "Collection Name"

    fireEvent.change(inputElement, { target: { value: collectionName } })

    fireEvent.click(addButtonElement)

    expect(mockAddNewCollection).toHaveBeenCalledWith(
      expect.objectContaining({ name: collectionName }),
    )
  })
})
