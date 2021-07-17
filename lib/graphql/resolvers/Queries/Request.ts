import axios from "axios";
import { config } from "../utils";

export const RequestQueries = {
  getRequest: async (parent: any, args: any, context: any) => {
    try {
      const request = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/${args?.id}?expand=true`,        
        { ...config(context) }
      );
      return request.data;
    } catch (error) {
      throw error;
    }
  },
  getCancelRequest: async (parent: any, args: any, context: any) => {
    try {
      const request = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/${args?.id}/cancel`,        
        { ...config(context) }
      );
      return request && true;
    } catch (error) {
      throw error;
    }
  },
  getRequestTransitionStates: async (parent: any, args: any, context: any) => {
    try {
      const request = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/${args?.id}/transitionstates`,        
        { ...config(context) }
      );
      return request.data;
    } catch (error) {
      throw error;
    }
  },
  getRequests: async (parent: any, args: any, context: any) => {
    try {
      const requests = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/filter?expand=true&page=${args?.page}&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,
        {...(JSON.parse(args?.filters || "{}"))},
        { ...config(context) }
      );
      return requests.data;
    } catch (error) {
      throw error;
    }
  },
};
