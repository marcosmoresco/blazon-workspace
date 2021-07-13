import { gql } from "apollo-server-express";
import { Link } from "./Link";
import { User } from "./User";
import { Resume } from "./Resume";
import { Permission } from "./Permission";
import { PasswordVault } from "./PasswordVault";
import { ApprovalDetails } from "./ApprovalDetails";
import { Request } from "./Request";

export const typeDefs = gql`
  ${Link}
  ${User}
  ${Resume}
  ${Permission}
  ${PasswordVault}
  ${ApprovalDetails}
  ${Request}

  type Query {
    getResume: Resume
    getPasswordVaultEntries: [PasswordVault]
    getRequests(page: Int, size: Int): RequestRepresentation
  }
`;
