import { IntlShape } from "react-intl";

export type TitleProps = {
  intl: IntlShape;
  title: string;
  onBack?: () => void;
};
