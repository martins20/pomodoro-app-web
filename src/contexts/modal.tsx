import { FC, useMemo, useState, useCallback, createContext, PropsWithChildren } from "react"

import { Modal } from "../components"

export type ModalContextData = {
  toggleModalVisibility: () => void
  setModalContent: (content: JSX.Element) => void
}

export const ModalContextData = createContext<ModalContextData>({} as ModalContextData)

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [content, setContent] = useState(<></>)

  const toggleModalVisibility = useCallback(() => setIsModalVisible((state) => !state), [])

  const setModalContent = useCallback((Content: JSX.Element) => {
    setContent(Content)
  }, [])

  const modalContextData = useMemo<ModalContextData>(
    () => ({
      setModalContent,
      toggleModalVisibility,
    }),
    [toggleModalVisibility, setModalContent],
  )

  return (
    <ModalContextData.Provider value={modalContextData}>
      {children} <Modal isVisible={isModalVisible}>{content}</Modal>
    </ModalContextData.Provider>
  )
}
