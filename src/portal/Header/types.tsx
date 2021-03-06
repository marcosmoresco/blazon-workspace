import { IntlShape } from "react-intl";

export type HeaderProps = {
  intl: IntlShape;
  classes: {
    root: string;
    toolBar: string;
    logoSearchInput: string;
    searchInput: string;
    menuOptionsContent: string;
    menuOptions: string;
    optionImage: string;
    menuList: string;
    menuItem: string;
    menuImage: string;
    caretRight: string;
    darkMode: string;
    darkModeText: string;
    darkModeSwitch: string;
  };
};

type Link = {
  href: string;
  rel: string;
};

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
