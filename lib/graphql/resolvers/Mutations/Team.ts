import axios from "axios";
import { config } from "../utils";

export const TeamMutations = {
  responsibleTeamGenerateRequests: async (parent: any, args: any, context: any) => {
    try {      
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/responsibleteam/generateRequests`,
        JSON.parse(args?.payload || "{}"),
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },  
};

