import { IntlShape } from "react-intl";

export type TitleProps = {
  intl: IntlShape;
  title: string;
  subTitle?: string;
  onBack?: () => void;
  icon?: any;
  hierarchy?: TitleHierarchy
};


export type TitleHierarchy = {
  name?: string;
  formatedName?: string;
  href?: string;
  children?: TitleHierarchy[];
}