import { FC, PropsWithChildren } from "react"

import { ModalProvider } from "./modal"
import { CollectionProvider } from "./collection"

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <CollectionProvider>
    <ModalProvider>{children}</ModalProvider>
  </CollectionProvider>
)
