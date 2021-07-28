export type Link = {
  href: string;
  rel: string;
};

export type User = {
  identifier: number;
  displayName: string;
  username: string;
  links: [Link];  
};

export type Notification = {
  identifier: number;
  from: User;
  to: User;
  date: string;
  subject: string;
  content: string;
  status: string;
  links: [Link]
}

export type NotificationRepresentation = {
  nroNotRead: number;
  total: number;
  notifications: [Notification]
  links: [Link]
}
