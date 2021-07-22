export const User = `
  type User {
    identifier: ID
    username: String
    displayName: String  
    links: [Link]
  }
`;

export const Queries = `
  getUserFullText(q: String, size: Int): [User]
`;
