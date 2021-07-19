import axios from "axios";
import { config } from "../utils";

export const UserQueries = {
  getUserFullText: async (parent: any, args: any, context: any) => {
    try {
      const requests = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/users/fulltextsearch?q=${args?.q}&size=${args?.size}`,        
        { ...config(context) }
      );
      return requests.data?.users;
    } catch (error) {
      throw error;
    }
  },
};
