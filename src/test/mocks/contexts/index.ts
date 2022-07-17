import { mockCollectionContextData } from "./collection"
import { mockModalContextData } from "./modal"

jest.mock("../../../hooks", () => ({
  useModal: () => mockModalContextData,
  useCollection: () => mockCollectionContextData,
}))
