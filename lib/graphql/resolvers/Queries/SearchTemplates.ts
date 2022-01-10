import axios from "axios";
import { config } from "../utils";

export const SearchTemplatesQueries = {
  getSearchTemplates: async (parent: any, args: any, context: any) => {
    try {
      const item = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/searchtemplates`,
        { ...config(context) }
      );
      return item.data;
    } catch (error) {
      throw error;
    }
  },  
};
