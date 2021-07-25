import axios from "axios";
import { config } from "../utils";

export const FormDatasQueries = {
  getModifyEntry: async (parent: any, args: any, context: any) => {
    try {
      const entries = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/formdatas/modifyentry?entryid=${args?.entryId}&schema=${args?.schema}`,
        { ...config(context) }
      );
      return JSON.stringify(entries.data);
    } catch (error) {
      throw error;
    }
  },
};