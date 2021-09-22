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
  updatePasswordVault: async (parent: any, args: any, context: any) => {
    try {
      await axios.put(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries/${args?.id}`,
        JSON.parse(args?.payload),
        { ...config(context) }
      );
      return true;
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
  deletePasswordVaultEntry: async (parent: any, args: any, context: any) => {
    try {
      await axios.delete(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries/${args.id}`,        
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  sharePasswordVaultEntry: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries/${args.id}/share`,   
        JSON.parse(args?.payload),     
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  }, 
  unsharePasswordVaultEntry: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries/${args.id}/unshare`,   
        JSON.parse(args?.payload),     
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
}
