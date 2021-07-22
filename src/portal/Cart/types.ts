import { SelfServiceCartItem } from "@requestCart/types";

export type SelfServiceCartItemMessageType = "add" | "remove";

export type SelfServiceCartItemMessage = {
  id: number;
  messageType: string;
};

export type CartActionType = {
  item: SelfServiceCartItem;
  messageType: SelfServiceCartItemMessageType;
  type: string;
  id?: number;
};

export type CartProps = {
  removeCartItem: any;
  cart: any;
};

export type CartState = {
  items: Array<SelfServiceCartItem & SelfServiceCartItemMessage>;
};