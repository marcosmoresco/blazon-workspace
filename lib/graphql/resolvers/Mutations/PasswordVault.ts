import axios from "axios";
import { config } from "../utils";

export const PasswordVaultMutations = {
  savePasswordVault: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries`,
        args,
        { ...config(context) }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  revokePasswordVaultEntry: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries/${args.id}/revoke`,
        { permission: args.permission, users: [{ identifier: args.userId }] },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  grantPasswordVaultEntry: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries/${args.id}/grant`,
        { permission: args.permission, users: [{ identifier: args.userId }] },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
};
