import { IntlShape } from "react-intl";

export type FilterProps = {
  intl: IntlShape;
  activeType: string;
  onSave(filtered: {[key: string]: any}, total: number): void; 
  setTotalFiltered(total: number): void;
  filterList: any;
  filteredValue: {[key: string]: any};
  filterMapReference: {[key: string]: any};
  open: boolean;
  setOpen(value: boolean): void;
  setFilteredValue(value: {[key: string]: any}): void;
  setFilterMapReference(value: {[key: string]: any}): void;
  initFilters(filters: any, filterMapReference: any): void;
  classes: {
    root: string;
    totalItens: string;
    tags: string;
    tag: string;
    filters: string;
    filter: string;
    filterIcon: string;
    filterCaretRight: string;
    searchFiltersTitle: string;
    searchFiltersHeader: string;
    searchFilters: string;
    searchFiltersPadding: string;
    searchFiltersContent: string;
    searchFiltersContentTitle: string;
    searchFiltersContentDivider: string;
    defaultTag: string;
    filterFilters: string;
    filterExpanded: string;
    filtersItem: string;
    searchtext: string;
    searchCards: string;
    searchCard: string;
    searchCardContent: string;
    searchCardContentHeader: string;
    searchCardContentHeaderImage: string;
    searchCardContentHeaderTitle: string;
    searchCartContent: string;
    header: string;
    expandedFilter: string;
  };
};

export type FilterValueType = {
  value: string;
  label: string;
};

export type FilterType = {
  name: string;
  label: string;
  type: string;
  expanded?: boolean;
  values: FilterValueType[];
};
