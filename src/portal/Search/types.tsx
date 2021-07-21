import { IntlShape } from "react-intl";

export type SearchProps = {
  intl: IntlShape,
  classes: {
    root: string;
    totalItens: string;
    tags: string;
    tag: string;
    filters: string;
    filter: string;
    filterIcon: string;
    searchtext: string;
    searchCards: string;
    searchCard: string;
    searchCardContent: string;
    searchCardContentHeader: string;
    searchCardContentHeaderImage: string;
    searchCardContentHeaderTitle: string;
    searchCartContent: string;
  };
};

export type ReferenceTo = {
  referenceToIdentifier: number;
  referenceToName: string;
  referenceToType: string;
};

export type SelfServiceAttribute = {
  name: string;
  value: string;
};

export type SelfService = {
  name: string;
  description: string;
  type: string;
  identifier: string;
  referenceTo: ReferenceTo;
  attributes: SelfServiceAttribute[]
};

export type ResourceDirectory = {
  identifier: number;
  name: string;
  description: string;
};

export type EntitlementDirectory = {
  identifier: number;
  name: string;
  description: string;
  resource: ResourceDirectory;
};

export type RoleDirectory = {
  identifier: number;
  name: string;
  description: string;
};

export type RoleDirectoryRight = {
  group: RoleDirectory,
  resource: ResourceDirectory
};
