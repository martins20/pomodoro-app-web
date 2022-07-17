import { mockCollectionContextData } from "./collection"
import { mockModalContextData } from "./modal"

export const mockContexts = {
  useModal: () => mockModalContextData,
  useCollection: () => mockCollectionContextData,
}

jest.mock("../../../hooks", () => ({ ...jest.requireActual("../../../hooks") }))
