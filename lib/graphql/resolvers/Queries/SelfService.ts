import axios from "axios";
import { config } from "../utils";

export const SelfServiceQueries = {  
  getSelfService: async (parent: any, args: any, context: any) => {
    try {
      const items = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/selfservice/items?size=10000${args?.type ? `&tyoe=${args.type}` : ""}${args?.q ? `&q=${args.q}` : ""}`,        
        { ...config(context) }
      );
      return items.data;
    } catch (error) {
      throw error;
    }
  },
};
