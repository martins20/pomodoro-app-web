import { useState, InputHTMLAttributes, FC, ChangeEvent, KeyboardEvent } from "react"

import { Container, Input as StyledInput, ValidationMessage } from "./styles"

type InputProps = {
  onInputSubmit: () => void

  validation: {
    getInputValidation: () => boolean
    message: string
  }
} & InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = ({ onInputSubmit, validation, ...rest }) => {
  const [isInputValid, setIsInputvalid] = useState(true)

  const handleInputSubmitByPressingEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    const isEnterPressed = event.key.toLocaleLowerCase() === "enter"

    if (isEnterPressed) {
      const isInputValidationFailed = validation.getInputValidation()

      setIsInputvalid(isInputValidationFailed)

      if (!isInputValidationFailed) return

      onInputSubmit()
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = rest

    setIsInputvalid(true)

    if (!onChange) return

    onChange(event)
  }

  return (
    <Container isInvalid={!isInputValid}>
      <StyledInput
        {...rest}
        onKeyUp={handleInputSubmitByPressingEnterKey}
        isInvalid={!isInputValid}
        onChange={handleChange}
      />
      <ValidationMessage>{validation.message}</ValidationMessage>
    </Container>
  )
}
