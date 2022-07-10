import { useContext } from "react"

import { CollectionContext, CollectionContextData } from "../contexts/collection"

export const useCollection = (): CollectionContextData => {
  const context = useContext(CollectionContext)

  if (!context) throw new Error("Cannot use hook 'useCollection' without a 'CollectionProvider'")

  return context
}
