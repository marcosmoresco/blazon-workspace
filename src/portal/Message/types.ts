import { VariantType } from 'notistack'

export type MessageType = {
  id: number
  message: string
  type: VariantType
}

export type MessageProps = { 
  removeMessage: any,
  message: any  
}

export type MessageState = { 
  messages: Array<MessageType>
}