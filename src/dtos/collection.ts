import { TodoDTO } from "./todo"

export interface CollectionDTO {
  id: string
  name: string
  todos: TodoDTO[]
  createdAt: Date
}
