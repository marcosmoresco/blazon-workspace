export const PasswordVault = `
  type PasswordVault {
    identifier: Int
    name: String
    description: String
    username: String
    password: String
    createdAt: String
    permissions: [Permission]
    links: [Link]
  }
`;

export const Queries = `
  getPasswordVaultEntries: [PasswordVault] 
`;
export const Mutations = `
  savePasswordVault(name: String, description: String, username: String, password: String): PasswordVault
  revokePasswordVaultEntry(id: Int, permission: String, userId: Int): Boolean
  grantPasswordVaultEntry(id: Int, permission: String, userId: Int): Boolean
`;
