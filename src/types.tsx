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