//Message
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'

export type MessageActionType = {
  id: number
  message: string
  type: string
  messageType: string
}