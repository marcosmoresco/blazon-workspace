import { Task } from  "@modules/Task/types";
import { Request } from  "@modules/Requests/types";
import { User } from  "@types";

export type DetailUserProps = {
  task?: Task | undefined; 
  request?: Request | undefined
  title?: string;   
  user?: User;
};

export type UserContentProps = {
  user: any | undefined; 
  close(): void; 
};


