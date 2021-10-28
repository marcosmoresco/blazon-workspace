import axios from "axios";
import { config } from "../utils";

export const ItemsQueries = {
  searchItems: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/search/items?size=${args?.size || 10}${args?.q && ("&q=" + args?.q) || ""}${args?.type && ("&type=" + args?.type) || ""}`,
        JSON.parse(args?.payload || "{}"),
        { ...config(context) }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};

 