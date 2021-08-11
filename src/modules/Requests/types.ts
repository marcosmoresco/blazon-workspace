import { IntlShape } from "react-intl";
import { string } from "yup/lib/locale";

export type RequestsProps = {
  intl: IntlShape;
  onBack?: () => void;
};

export interface Request {
  identifier: number;
  type: string;
  status: string;
  requester: User;
  beneficiary: User;
  justification: string;
  approvalDetails: [ApprovalDetails];
  sodDetails: [ApprovalDetails];
  account: Detail;
  resource: Detail;
  entitlement: Detail;
  role: Detail;
  user: UserDetail;
  createdAt: string;
  effectiveDate: string;
  finalizedAt: string;
  links: Link[];
}

interface User {
  identifier: number;
  username: string;
  displayName: string;
  links: Link[];
}

interface UserDetail {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  personalEmail: string;
  displayName: string;
  mobilePhone: string;
  phone: string;
  birthDate: string;
  username: string;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}

export interface ApprovalDetails {
  identifier: number;
  creation: string;
  approvalDate: string;
  outcome: string;
  taskId: number;
  approver: User;
}

interface Detail {
  identifier: number;
  name: string;
  description: string;
  accountIdentifier: string;
}
export interface TransitionStates {
  sourceState: string;
  targetState: string;
  date: string;
  description: string;
  detail: string;
}

export interface OpenRequests {
  message: string;
  amountOpen: number;
}
