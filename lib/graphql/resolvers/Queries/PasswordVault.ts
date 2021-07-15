import axios from "axios";
import { config } from "../utils";

export const PasswordVaultQueries = {
  getPasswordVaultEntries: async (parent: any, args: any, context: any) => {
    try {
      const entries = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries`,
        { ...config(context) }
      );
      return entries.data;
    } catch (error) {
      throw error;
    }
  },
};
