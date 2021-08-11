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
  getPasswordVaultEntry(id: Int): PasswordVault
`;
export const Mutations = `
  savePasswordVault(name: String, description: String, username: String, password: String): PasswordVault
  revokePasswordVaultEntry(id: Int, permission: String, userId: Int): Boolean
  grantPasswordVaultEntry(id: Int, permission: String, userId: Int): Boolean
  deletePasswordVaultEntry(id: Int): Boolean
  sharePasswordVaultEntry(id: Int, payload: String): Boolean
  unsharePasswordVaultEntry(id: Int, payload: String): Boolean
`;
