import axios from "axios";
import { config } from "../utils";

export const UserMutations = {
  shareUserSharedAccount: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/identitybusinessrules/sharedaccounts/share`,
        {
          account: { identifier: args.accountId },
          user: { identifier: args.userId },
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  unshareUserSharedAccount: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/identitybusinessrules/sharedaccounts/unshare`,
        {
          account: { identifier: args.accountId },
          user: { identifier: args.userId },
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  credentialsUserApplicationAccount: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/identitybusinessrules/applicationaccounts/${args.accountId}/credentials`,
        {
          justification: args.justification,
          effectiveDate: args.effectiveDate
        },
        { ...config(context) }
      );
      return result?.data?.requestId;
    } catch (error) {
      throw error;
    }
  },
  changeUserThumb: async (parent: any, args: any, context: any) => {
    try {
      await axios.put(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/users/${context.req?.session?.passport?.user?.id}/images`,
        {
          thumb: args.thumb,          
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/users/changepassword`,
        {...args},
        { ...config(context)}
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  checkoutAdminAccount: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/identitybusinessrules/adminaccounts/checkout`,
        JSON.parse(args?.payload),
        { ...config(context)}
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (parent: any, args: any, context: any) => {
    try {
      await axios.put(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/users/userdatas`,
        JSON.parse(args?.payload),
        { ...config(context)}
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
};
