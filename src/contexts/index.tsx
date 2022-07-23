import { FC, PropsWithChildren } from "react"

import { ModalProvider } from "./modal"
import { CollectionProvider } from "./collection"
import { Header } from "../components"

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <CollectionProvider>
    <ModalProvider>
      <Header />
      {children}
    </ModalProvider>
  </CollectionProvider>
)
