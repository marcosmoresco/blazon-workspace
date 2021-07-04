import { 
  ADD_MESSAGE, 
  REMOVE_MESSAGE 
} from './actionTypes'

export const addMessage = (message:any, messageType?:string) => ({
  type: ADD_MESSAGE,
  message,
  messageType
})

export const removeMessage = (id:number) => ({
  type: REMOVE_MESSAGE,
  id
})