import { FC, PropsWithChildren } from "react"

import { ModalProvider } from "./modal"
import { CollectionProvider } from "./collection"

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <ModalProvider>
    <CollectionProvider>{children}</CollectionProvider>
  </ModalProvider>
)
