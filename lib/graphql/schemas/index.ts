import { gql } from "apollo-server-express";
import { Link } from "./Link";
import { User } from "./User";
import { Resume } from "./Resume";
import { Permission } from "./Permission";
import { PasswordVault } from "./PasswordVault";
import { ApprovalDetails } from "./ApprovalDetails";
import { Request } from "./Request";
import { SelfService } from "./SelfService";
import { Directory } from "./Directory";

export const typeDefs = gql`
  ${Link}
  ${User}
  ${Resume}
  ${Permission}
  ${PasswordVault}
  ${ApprovalDetails}
  ${Request}
  ${SelfService}
  ${Directory}

  type Query {    
    getResume: Resume
    getPasswordVaultEntries: [PasswordVault]
    getRequest(id: Int): Request
    getCancelRequest(id: Int): Boolean
    getRequestTransitionStates(id: Int): [RequestTransitionState]
    getRequests(page: Int, size: Int, ord: String, filters: String): RequestRepresentation     
    getSelfService(q: String, size: Int, type: String): [SelfService]  
    getSelfServiceAdvanced(q: String, size: Int, type: String, filters: String): [SelfService] 
    getSelfServiceFilters(type: String): [SelfServiceFilter]
    getSelfServiceItem(id: String): SelfService
    getUserFullText(q: String, size: Int): [User]
    getDirectoryResource(id: Int): ResourceDirectory
    getDirectoryResourceEntitlements(id: Int, page: Int, size: Int, ord: String): EntitlementDirectoryRepresentation
    getDirectoryEntitlement(id: Int): EntitlementDirectory
    getDirectoryRole(id: Int): RoleDirectory
    getDirectoryRoleRights(id: Int, page: Int, size: Int, ord: String): RoleDirectoryRightRepresentation
    getDirectoryRoleRightEntitlements(id: Int, rightId: Int, page: Int, size: Int, ord: String): EntitlementDirectoryRepresentation
  }
`;
