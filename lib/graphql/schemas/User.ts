export const User = `
  type User {
    identifier: ID
    username: String
    displayName: String  
    links: [Link]
  }

  type UserEntitlementsRepresentation {
    links: [Link]
    representation: [EntitlementDirectory]
  }

  type UserRolesRepresentation {
    links: [Link]
    roles: [RoleDirectory]
  }

  type UserAccount {
    identifier: ID
    accountIdentifier: String
    name: String
    resourceName: String
    status: String
    createdAt: String
    modifiedAt: String
    links: [Link]
  }

  type UserAccountsRepresentation {
    links: [Link]
    accounts: [UserAccount]
  }
`;

export const Queries = `
  getUserFullText(q: String, size: Int): [User]
  getUserEntitlements(page: Int, size: Int, ord: String, filters: String): UserEntitlementsRepresentation
  getUserRoles(page: Int, size: Int, ord: String): UserRolesRepresentation
  getUserAccounts(page: Int, size: Int, ord: String, filters: String): UserAccountsRepresentation
  getUserSharedAccountMembers(id: String): [User]
`;

export const Mutations = `  
  shareUserSharedAccount(accountId: Int, userId: Int): Boolean
  unshareUserSharedAccount(accountId: Int, userId: Int): Boolean
  credentialsUserApplicationAccount(accountId: Int, justification: String, effectiveDate: String): Int
  changeUserThumb(thumb: String): Boolean
  changePassword(currentPassword: String, newPassword: String, newPasswordConfirm: String): Boolean
  checkoutAdminAccount(payload: String): Boolean
`;
