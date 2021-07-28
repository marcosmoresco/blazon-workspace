import axios from "axios";
import { config } from "../utils";

export const SelfServiceMutations = {
  submitSelfServiceCart: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart/submit`,
        args,
        { ...config(context) }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
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
        targetType: args?.targetType,
      };
    } catch (error) {
      throw error;
    }
  },
  addSelfServiceCartItem: async (parent: any, args: any, context: any) => {
    try {

      const body: {[key: string]: any} = { catalogItemId: args.id };
      if(args.userId) {
        body.userId = args.userId;
      }
      if(args.assignType) {
        body.assignType = args.userId;
      }

      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart/item`,
        body,
        { ...config(context) }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  updateSelfServiceCartItem: async (parent: any, args: any, context: any) => {
    try {
      await axios.put(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart/item/${args?.identifier}`,
        { assignType: args.assignType },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  updateSelfServiceCartItemInstance: async (
    parent: any,
    args: any,
    context: any
  ) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart/item/${args.itemId}/updateinstance`,
        {
          identifier: args.identifier,
          payload: JSON.stringify({
            additionalFields: JSON.parse(args.payload),
          }),
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  addSelfServiceCartItemInstance: async (
    parent: any,
    args: any,
    context: any
  ) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart/item/${args.itemId}/addinstance`,
        {
          userId: args.userId,         
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
 deleteSelfServiceCartItemInstance: async (
    parent: any,
    args: any,
    context: any
  ) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart/item/${args.itemId}/removeinstance`,
        {
          userId: args.userId,         
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
};
