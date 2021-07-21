import axios from "axios";
import { config } from "../utils";

export const SelfServiceQueries = {  
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
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/items/advanced?size=${args?.size || 10000}${args?.type && args?.type !== "ALL" ? `&type=${args.type}` : ""}${args?.q ? `&q=${args.q}` : ""}`,        
        JSON.parse(args?.filters || "[]"),
        { ...config(context) }
      );
      return items.data?.representation;
    } catch (error) {
      throw error;
    }
  },
  getSelfService: async (parent: any, args: any, context: any) => {
    try {
      const items = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/items?size=${args?.size || 10000}${args?.type && args?.type !== "ALL" ? `&type=${args.type}` : ""}${args?.q ? `&q=${args.q}` : ""}`,        
        { ...config(context) }
      );
      return items.data;
    } catch (error) {
      throw error;
    }
  },
};
