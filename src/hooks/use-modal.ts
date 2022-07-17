import { useContext } from "react"

import { ModalContextData } from "../contexts/modal"

export const useModal = (): ModalContextData => {
  const context = useContext(ModalContextData)

  if (!context) throw new Error("Cannot use hook 'useModal' without a 'ModalProvider'")

  return context
}
