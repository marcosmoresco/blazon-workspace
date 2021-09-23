import { Link } from "@types";

export type UserAccount = {
  identifier: number;
  accountIdentifier: string;
  resourceName: string;
  status: string;
  createdAt: string;
  links: [Link];
};

export type UserData = {
  name: string;
  label: string;
  value: string;
  editable: boolean;
  required: boolean;
  type: string;
};