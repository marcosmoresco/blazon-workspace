import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  ADD_CART_ITEM_MESSAGE,
  REMOVE_CART_ITEM_MESSAGE
} from "./actionTypes";

export const addMessage = (message: any, messageType?: string) => ({
  type: ADD_MESSAGE,
  message,
  messageType,
});

export const removeMessage = (id: number) => ({
  type: REMOVE_MESSAGE,
  id,
});

export const addCartItemMessage = (item: any, messageType?: string) => ({
  type: ADD_CART_ITEM_MESSAGE,
  item,
  messageType
});

export const removeCartItemMessage = (id: number) => ({
  type: REMOVE_CART_ITEM_MESSAGE,
  id,
});