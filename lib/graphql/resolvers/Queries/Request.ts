import axios from "axios";
import { config } from "../utils";

export const RequestQueries = {
  getRequests: async (parent: any, args: any, context: any) => {
    try {
      const requests = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/filter?page=${args?.page}&size=${args?.size}`,
        {},
        { ...config(context) }
      );
      return requests.data;
    } catch (error) {
      throw error;
    }
  },
};
