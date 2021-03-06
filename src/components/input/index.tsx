import { useState, InputHTMLAttributes, FC, ChangeEvent, KeyboardEvent, useMemo } from "react"

import { Container, Input as StyledInput, ValidationMessage } from "./styles"

type InputProps = {
  onInputSubmit: () => void
  isValueValid?: boolean

  validation: {
    getInputValidation: () => boolean
    message: string
  }
} & InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = ({ onInputSubmit, isValueValid, validation, ...rest }) => {
  const [isInputValid, setIsInputvalid] = useState(true)

  const isInputTextValid = useMemo(() => isInputValid && isValueValid, [isInputValid, isValueValid])

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
    <Container isInvalid={!isInputTextValid}>
      <StyledInput
        {...rest}
        onKeyUp={handleInputSubmitByPressingEnterKey}
        isInvalid={!isInputTextValid}
        onChange={handleChange}
      />
      {!isInputTextValid && <ValidationMessage>{validation.message}</ValidationMessage>}
    </Container>
  )
}
