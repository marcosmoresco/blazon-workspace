import { ADD_CART_ITEM_MESSAGE, REMOVE_CART_ITEM_MESSAGE } from "../actions/actionTypes";
import type { CartActionType, SelfServiceCartItemMessage, SelfServiceCartItemMessageType } from "../portal/Cart/types";
import type { SelfServiceCartItem } from "@requestCart/types";

const initialState = {
  items: Array<SelfServiceCartItem & SelfServiceCartItemMessage>(),
};

export const cart = (state = initialState, action: CartActionType) => {
  switch (action.type) {
    case ADD_CART_ITEM_MESSAGE: {
      const items = [...state.items];
      const id = Math.floor(Math.random() * 1e12);

      items.push({
        id,
        messageType: action.messageType || "add" as SelfServiceCartItemMessageType,
        ...action.item
      });

      return {
        ...state,
        items,
      };
    }
    case REMOVE_CART_ITEM_MESSAGE: {
      const items = [...state.items];
      const index = items.findIndex((item) => item.id === action.id);
      items.splice(index, 1);

      return {
        ...state,
        items,
      };
    }
    default:
      return state;
  }
};
