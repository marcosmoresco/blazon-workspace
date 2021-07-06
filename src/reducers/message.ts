import { ADD_MESSAGE, REMOVE_MESSAGE } from "../actions/actionTypes";
import type { MessageActionType, MessageType } from "../portal/Message/types";

const initialState = {
  messages: Array<MessageType>(),
};

export const message = (state = initialState, action: MessageActionType) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const messages = [...state.messages];
      const id = Math.floor(Math.random() * 1e12);

      messages.push({
        message: action.message,
        id,
        type: action.messageType || "success",
      });

      return {
        ...state,
        messages,
      };
    }
    case REMOVE_MESSAGE: {
      const messages = [...state.messages];
      const index = messages.findIndex((item) => item.id === action.id);
      messages.splice(index, 1);

      return {
        ...state,
        messages,
      };
    }
    default:
      return state;
  }
};
