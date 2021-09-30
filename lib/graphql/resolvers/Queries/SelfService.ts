import axios from "axios";
import { config } from "../utils";

export const SelfServiceQueries = {
  getSelfServiceCart: async (parent: any, args: any, context: any) => {
    try {
      const item = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/cart`,
        { ...config(context) }
      );
      return item.data;
    } catch (error) {
      throw error;
    }
  },  
  getSelfServiceFilters: async (parent: any, args: any, context: any) => {
    try {
      const items = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/items/filters?type=${args?.type}`,
        { ...config(context) }
      );
      return items.data?.items;
    } catch (error) {
      throw error;
    }
  },
  getSelfServiceAdvanced: async (parent: any, args: any, context: any) => {
    try {
      const items = await axios.post(
        `${
          process.env.SERVER_HOST
        }/blazon-workspace-backend/workspace/selfservice/items/advanced?size=${
          args?.size || 10000
        }${args?.type && args?.type !== "ALL" ? `&type=${args.type}` : ""}${
          args?.q ? `&q=${encodeURIComponent(args.q)}` : ""
        }`,
        JSON.parse(args?.filters || "[]"),
        { ...config(context) }
      );
      return items.data;
    } catch (error) {
      throw error;
    }
  },
  getSelfService: async (parent: any, args: any, context: any) => {
    try {
      const items = await axios.get(
        `${
          process.env.SERVER_HOST
        }/blazon-workspace-backend/workspace/selfservice/items?size=${
          args?.size || 10000
        }${args?.type && args?.type !== "ALL" ? `&type=${args.type}` : ""}${
          args?.q ? `&q=${encodeURIComponent(args.q)}` : ""
        }`,
        { ...config(context) }
      );
      return items.data;
    } catch (error) {
      throw error;
    }
  },
  getSelfServiceItem: async (parent: any, args: any, context: any) => {
    try {
      const item = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/items/get?expand=true&itemid=${args?.id}`,
        { ...config(context) }
      );
      return item.data;
    } catch (error) {
      throw error;
    }
  },   
};
