import { Link } from "@types";

export type UserAccount = {
  identifier: number;
  accountIdentifier: string;
  resourceName: string;
  status: string;
  createdAt: string;
  links: [Link];
};