import { SelfServiceCartItem } from "@requestCart/types";

export type CheckouitemProps = {
  item: SelfServiceCartItem,
  allowedAssignTypes: string[] | undefined
};