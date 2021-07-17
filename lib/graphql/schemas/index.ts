import { gql } from "apollo-server-express";
import { Link } from "./Link";
import { User } from "./User";
import { Resume } from "./Resume";
import { Permission } from "./Permission";
import { PasswordVault } from "./PasswordVault";
import { ApprovalDetails } from "./ApprovalDetails";
import { Request } from "./Request";
import { SelfService } from "./SelfService";

export const typeDefs = gql`
  ${Link}
  ${User}
  ${Resume}
  ${Permission}
  ${PasswordVault}
  ${ApprovalDetails}
  ${Request}
  ${SelfService}

  type Query {    
    getResume: Resume
    getPasswordVaultEntries: [PasswordVault]
    getRequest(id: Int): Request
    getCancelRequest(id: Int): Boolean
    getRequestTransitionStates(id: Int): [RequestTransitionState]
    getRequests(page: Int, size: Int, ord: String, filters: String): RequestRepresentation     
    getSelfService(q: String, type: String): [SelfService]
  }
`;
