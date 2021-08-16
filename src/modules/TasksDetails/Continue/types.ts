import { Task } from "@modules/Task/types";

export type ContinueProps = {
  task: Task | undefined;
  payload: {[key: string]: any} | undefined;
  setPayload: any;
  stage: string;
};
