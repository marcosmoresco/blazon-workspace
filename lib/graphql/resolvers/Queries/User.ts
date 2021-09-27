import axios from "axios";
import { config } from "../utils";

export const UserQueries = {
  getUserFullText: async (parent: any, args: any, context: any) => {
    try {
      const userFullText = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/users/fulltextsearch?q=${args?.q}&size=${args?.size}`,
        { ...config(context) }
      );
      return userFullText.data?.users;
    } catch (error) {
      throw error;
    }
  },
  getUserEntitlements: async (parent: any, args: any, context: any) => {
    try {
      const entitlements = await axios.post(
        `${
          process.env.SERVER_HOST
        }/blazon-workspace-backend/workspace/directory/entitlements/fromloggeduser/filter?page=${
          args?.page
        }&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,
        { ...JSON.parse(args?.filters || "{}") },
        { ...config(context) }
      );
      return entitlements.data;
    } catch (error) {
      throw error;
    }
  },
  getUserRoles: async (parent: any, args: any, context: any) => {
    try {
           
      const roles = await axios.post(
        `${
          process.env.SERVER_HOST
        }/blazon-workspace-backend/workspace/directory/roles/user?page=${
          args?.page
        }&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,
        { ...JSON.parse(args?.filters || "{}") },
        { ...config(context) }
      );
      return roles.data;
    } catch (error) {
      throw error;
    }
  },
  getUserAccounts: async (parent: any, args: any, context: any) => {
    try {
      const accounts = await axios.post(
        `${
          process.env.SERVER_HOST
        }/blazon-workspace-backend/workspace/directory/accounts/user?page=${
          args?.page
        }&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,
        { ...JSON.parse(args?.filters || "{}") },
        { ...config(context) }
      );
      return accounts.data;
    } catch (error) {
      throw error;
    }
  }, 
  getUserSharedAccountMembers: async (parent: any, args: any, context: any) => {
    try {
      const accountMembers = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/identitybusinessrules/sharedaccounts/${args?.id}/members`,
        { ...config(context) }
      );
      return accountMembers.data;
    } catch (error) {
      throw error;
    }
  },  
  getUserData: async (parent: any, args: any, context: any) => {
    try {
      const user = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/users/userdatas`,
        { ...config(context) }
      );
      return user.data;
    } catch (error) {
      throw error;
    }
  },  
  getSecretQuestions: async (parent: any, args: any, context: any) => {
    try {
      const questions = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/secretquestions`,
        { ...config(context) }
      );
      return questions.data;
    } catch (error) {
      throw error;
    }
  },  
  generateOtpToken: async (parent: any, args: any, context: any) => {
    try {
      const token = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/otptoken/generate`,
        { ...config(context) }
      );
      return token.data;
    } catch (error) {
      throw error;
    }
  },  
  validateOtpToken: async (parent: any, args: any, context: any) => {
    try {
      const validate = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/otptoken/validate?code=${args?.code}`,
        { ...config(context) }
      );
      return validate.data;
    } catch (error) {
      throw error;
    }
  }
};
