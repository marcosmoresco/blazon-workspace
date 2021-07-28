export const Notification = `

  type Notification {
    identifier: Int
    from: User
    to: User
    date: String
    subject: String
    content: String
    status: String
    links: [Link]
  }

  type NotificationRepresentation {
    nroNotRead: Int
    total: Int
    notifications: [Notification]
    links: [Link]
  }
`;

export const Queries = `
  getNotifications(page: Int, size: Int, ord: String): NotificationRepresentation 
`;
