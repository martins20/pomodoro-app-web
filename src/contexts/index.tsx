import { FC, PropsWithChildren } from "react"
import { CollectionProvider } from "./collection"

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <CollectionProvider>{children}</CollectionProvider>
)
