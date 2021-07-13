import { IntlShape } from "react-intl";

export type SecondTaskProps = {
  intl: IntlShape;
  created_at: string;
  approvel_at: string;
  task: string;
  approver: string;
  status: string;
  source: string;
  target: string;
  date: string;
  approvalDetail: string;
  sodDetail: string;
  historyStates: string;
};
