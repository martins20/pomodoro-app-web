import { FC, PropsWithChildren } from "react"

import { Icon } from "../icon"
import { useModal } from "../../hooks"

import { Overlay, Container } from "./styles"

export type ModalProps = {
  isVisible?: boolean
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, isVisible }) => {
  const { toggleModalVisibility } = useModal()

  return (
    <>
      {isVisible && (
        <Overlay>
          <Container data-testid="modal">
            <header>
              <button data-testid="close-modal-button" onClick={toggleModalVisibility}>
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
