import { IntlShape } from "react-intl";

export type TitleProps = {
  intl: IntlShape;
  title: string;
  subTitle?: string;
  onBack?: () => void;
  icon?: any;
};
