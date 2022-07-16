import { FC, PropsWithChildren, useState } from "react"

import { Icon } from "../icon"

import { Overlay, Container } from "./styles"

export type ModalProps = {
  isVisible?: boolean
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, isVisible }) => {
  const [isModalVisible, setIsModalVisible] = useState(!!isVisible)

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      {isModalVisible && (
        <Overlay>
          <Container data-testid="modal">
            <header>
              <button data-testid="close-modal-button" onClick={handleCloseModal}>
                <Icon type="close" size={25} />
              </button>
            </header>

            <section>{children}</section>
          </Container>
        </Overlay>
      )}
    </>
  )
}
