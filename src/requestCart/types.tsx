import { Link } from "@types";

export type SelfServiceCartItemInstanceValidation = {
  status: boolean;
};

export type SelfServiceCartItemInstance = {
  identifier: number;
  displayName: string;
  userId: string;
  accessAlreadyExistError: SelfServiceCartItemInstanceValidation;
  adminAccountLockedError: SelfServiceCartItemInstanceValidation;
  alreadyRequestInProgressError: SelfServiceCartItemInstanceValidation;
  needExpirationDateError: SelfServiceCartItemInstanceValidation;
  needSelectAccountError: SelfServiceCartItemInstanceValidation;
  relatedAccountNotFoundError: SelfServiceCartItemInstanceValidation;
  schemaValidatedError: SelfServiceCartItemInstanceValidation;
  links: [Link];
};

export type SelfServiceCartItem = {
  identifier: number;
  assignType: string;
  catalogItemId: string;
  catalogItemType: string;
  name: string;
  description: string;
  resourceType: string;
  targetType: string;
  targetId: string;
  instances: [SelfServiceCartItemInstance];
};

export type SelfServiceCart = {
  identifier: number;
  userId: String;
  allowedAssignTypes: [String];
  items: [SelfServiceCartItem];
};

export type RequestCartState = {
  cart: SelfServiceCart | null;
  setCart(cart: SelfServiceCart): void;
};

export type RequestCartContextProps = {
  children: React.ReactNode;
};
