import { Task } from "@modules/Task/types";

export type HeaderProps = {
  task: Task | undefined;
  payload?: {[key: string]: any} | undefined;
  setPayload?: any;
  stage?: string;
  setStage?: any;
};
