import { useContext } from "react"

import { ModalContext, ModalContextData } from "../contexts/modal"

export const useModal = (): ModalContextData => {
  const context = useContext(ModalContext)

  if (!context) throw new Error("Cannot use hook 'useModal' without a 'ModalProvider'")

  return context
}
