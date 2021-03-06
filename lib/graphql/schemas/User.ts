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

  type UserData {
    name: String
    label: String
    value: String
    editable: Boolean
    required: Boolean
    type: String
  }

  type UserDataRepresentation {
    links: [Link]
    fields: [UserData]
  }

  type SecretQuestion {
    identifier: Int
    userId: Int
    question: String
    answer: String
    beanshell: Boolean
    links: [Link]
  }

  type OtpToken {
    otpKey: String
  }

  type OtpTokenValidate {
    result: Boolean
  }
`;

export const Queries = `
  getUserFullText(q: String, size: Int): [User]
  getUserEntitlements(page: Int, size: Int, ord: String, filters: String): UserEntitlementsRepresentation
  getUserRoles(page: Int, size: Int, ord: String, filters: String): UserRolesRepresentation
  getUserAccounts(page: Int, size: Int, ord: String, filters: String): UserAccountsRepresentation
  getUserSharedAccountMembers(id: String): [User]
  getUserData: UserDataRepresentation
  getSecretQuestions: [SecretQuestion]
  generateOtpToken: OtpToken
  validateOtpToken(code: String): OtpTokenValidate
`;

export const Mutations = `  
  shareUserSharedAccount(accountId: Int, userId: Int): Boolean
  unshareUserSharedAccount(accountId: Int, userId: Int): Boolean
  credentialsUserApplicationAccount(accountId: Int, justification: String, effectiveDate: String): Int
  changeUserThumb(thumb: String): Boolean
  changePassword(currentPassword: String, newPassword: String, newPasswordConfirm: String): Boolean
  checkoutAdminAccount(payload: String): Boolean
  updateUser(payload: String): Boolean
  changePhone(payload: String): Boolean
  changeEmail(payload: String): Boolean
  saveSecretQuestion(payload: String): Boolean
  updateSecretQuestion(id: Int, payload: String): Boolean
  deleteSecretQuestions(payload: String): Boolean
`;
