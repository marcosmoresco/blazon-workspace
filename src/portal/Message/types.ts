import { VariantType } from 'notistack'

export type MessageType = {
  id: number
  message: any  
  type: VariantType
}

export type MessageActionType = {  
  message: any
  messageType: VariantType 
  type: string
}

export type MessageProps = { 
  removeMessage: any,
  message: any  
}

export type MessageState = { 
  messages: Array<MessageType>
}