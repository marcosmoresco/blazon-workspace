const Permission = `
  type Permission {
    user: User
    modify: Boolean
    share: Boolean
    read: Boolean
    links: [Link]
  }
`;
export default Permission;
