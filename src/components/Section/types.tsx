import { IntlShape } from "react-intl";

export type SectionProps = {
  intl: IntlShape;
  defaultValue: any;
  onSelect?(section: SectionType): void;
  list: SectionType[];  
  classes: any;
};

export type SectionType = {
  name: string;
  value: string;
  icon?: any;
  className?: string;
};
