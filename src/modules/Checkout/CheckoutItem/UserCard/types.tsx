import {
  SelfServiceCartItem,
  SelfServiceCartItemInstance,
} from "@requestCart/types";

export type CheckouitemIstanceProps = {
  instance: SelfServiceCartItemInstance;
  index: number;
  item: SelfServiceCartItem;
  onDelete: any;
  onAdd: any;
  onAddItem: any;
  onDeleteItem: any;
  onUpdateItem: any;
};
