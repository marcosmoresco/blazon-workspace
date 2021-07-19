import { IntlShape } from "react-intl";
import { Request } from "@modules/Requests/types";

export type FirstTaskProps = {
  intl: IntlShape;
  request: Request | undefined;
  refetch(): void
};
