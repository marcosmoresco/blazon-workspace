import { 
  ADD_MESSAGE, 
  REMOVE_MESSAGE 
} from './actionTypes'

import { MessageType } from '../portal/Message/types'

export const addMessage = (message:MessageType, messageType:string) => ({
  type: ADD_MESSAGE,
  message,
  messageType
})

export const removeMessage = (id:number) => ({
  type: REMOVE_MESSAGE,
  id
})