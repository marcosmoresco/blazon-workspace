const PasswordVault = `
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
export default PasswordVault;
