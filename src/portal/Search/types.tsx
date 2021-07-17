export type SearchProps = {
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

export type SelfService = {
  name: string;
  description: string;
  type: string;
  identifier: string;
  referenceTo: ReferenceTo;
};
