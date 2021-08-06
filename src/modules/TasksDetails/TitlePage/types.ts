import { IntlShape } from "react-intl";
import { Task } from "@modules/Task/types";

export type TitleProps = {
  intl: IntlShape;
  onBack?: () => void;
  task: Task | undefined;
};
