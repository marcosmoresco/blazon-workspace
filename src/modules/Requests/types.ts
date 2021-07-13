import { IntlShape } from "react-intl";

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
  account: Detail;
  resource: Detail;
  entitlement: Detail;
  role: Detail;
  createdAt: string;
  effectiveDate: string;
  links: Link[];
}

interface User {
  identifier: number;
  username: string;
  displayName: string;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}

interface ApprovalDetails {
  identifier: number;
  creation: string;
  approvalDate: string;
  outcome: string;
  taskId: number;
}

interface Detail {
  identifier: number;
  name: string;
  accountIdentifier: string;
}
