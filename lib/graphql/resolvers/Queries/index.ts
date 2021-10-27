import axios from "axios";
import { config } from "../utils";
import { PasswordVaultQueries } from "./PasswordVault";
import { RequestQueries } from "./Request";
import { SelfServiceQueries } from "./SelfService";
import { UserQueries } from "./User";
import { DirectoryQueries } from "./Directory";
import { FormDatasQueries } from "./FormDatas";
import { NotificationQueries } from "./Notification";
import { TaskQueries } from "./Tasks";
import { TaskQueuesQueries } from "./TaskQueues";
import { FormFieldsQueries } from "./FormFields";

export const Queries = {
  getResume: async (parent: any, args: any, context: any) => {
    try {
      const resume = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/tasks/executorresume${(args?.listStatus && "?listStatus=" + args?.listStatus) || ""}`,
        { ...config(context) }
      );
      return resume.data;
    } catch (error) {
      throw error;
    }
  },
  ...PasswordVaultQueries,
  ...RequestQueries,
  ...SelfServiceQueries,
  ...UserQueries,
  ...DirectoryQueries,
  ...FormDatasQueries,
  ...NotificationQueries,
  ...TaskQueries,
  ...TaskQueuesQueries,
  ...FormFieldsQueries
};
