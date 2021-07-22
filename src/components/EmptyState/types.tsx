import { IntlShape } from "react-intl";

export type EmptyStateProps = {
  intl: IntlShape; 
  icon: React.ReactNode;
  title: string;
  text: string;
};