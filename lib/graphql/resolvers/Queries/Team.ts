import axios from "axios";
import { config } from "../utils";

export const TeamQueries = {
  getResponsibleTeam: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/responsibleteam/filter`,
        JSON.parse(args?.payload || "{}"),
        { ...config(context) }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  getResponsibleTeamUserData: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/responsibleteam/userdatas/${args?.id}`,        
        { ...config(context) }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};