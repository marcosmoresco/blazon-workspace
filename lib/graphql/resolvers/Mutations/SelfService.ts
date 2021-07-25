import axios from "axios";
import { config } from "../utils";

export const SelfServiceMutations = {
  deleteSelfServiceCart: async (parent: any, args: any, context: any) => {
    try {
      await axios.delete(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart/`,
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  deleteSelfServiceCartItem: async (parent: any, args: any, context: any) => {
    try {
      await axios.delete(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart/item/${args?.identifier}`,
        { ...config(context) }
      );
      return {
        identifier: args?.identifier,
        name: args?.name,
        targetType: args?.targetType
      };
    } catch (error) {
      throw error;
    }
  },
  addSelfServiceCartItem: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart/item`,
        { catalogItemId: args.id },
        { ...config(context) },       
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};