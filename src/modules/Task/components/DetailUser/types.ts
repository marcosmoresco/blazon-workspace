import { Task } from  "@modules/Task/types";
import { User } from  "@types";

export type DetailUserProps = {
  task: Task | undefined; 
  title?: string;   
  user?: User;
};

export type UserContentProps = {
  user: any | undefined; 
  close(): void; 
};


