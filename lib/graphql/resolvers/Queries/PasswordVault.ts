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
  getPasswordVaultEntry: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries/${args.id}`,        
        { ...config(context) }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};
