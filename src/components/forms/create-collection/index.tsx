import { ChangeEvent, useCallback, useState } from "react"

import { useCollection, useModal } from "../../../hooks"

import { Input } from "../../input"

import { Container } from "./styles"

export const CreateCollection = () => {
  const { toggleModalVisibility } = useModal()
  const { addNewCollection } = useCollection()

  const [collectionName, setCollectionName] = useState("")
  const [isCollectionNameInputValid, setIsCollectionNameInputValid] = useState(true)

  const collectionNameInputValidation = useCallback(() => {
    const isInputValid = !!collectionName

    setIsCollectionNameInputValid(isInputValid)

    return isInputValid
  }, [collectionName])

  const handleChangeCollectionName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsCollectionNameInputValid(true)
    setCollectionName(event.target.value)
  }, [])

  const handleAddCollection = useCallback(() => {
    const isInputValid = collectionNameInputValidation()

    if (!isInputValid) return

    addNewCollection({
      name: collectionName,
    })

    toggleModalVisibility()
  }, [collectionName, addNewCollection, toggleModalVisibility, collectionNameInputValidation])

  return (
    <Container>
      <h1>Creating a new Collection</h1>

      <section>
        <Input
          value={collectionName}
          placeholder="Enter a collection name here"
          isValueValid={isCollectionNameInputValid}
          onChange={handleChangeCollectionName}
          onInputSubmit={handleAddCollection}
          validation={{
            message: "Collection Name is declared",
            getInputValidation: collectionNameInputValidation,
          }}
        />

        <button onClick={handleAddCollection}>Add</button>
      </section>
    </Container>
  )
}
