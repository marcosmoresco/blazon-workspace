import axios from "axios";
import { config } from "../utils";

export const NotificationQueries = {
  getNotifications: async (parent: any, args: any, context: any) => {
    try {
      const notifications = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/notifications?expand=true&page=${args?.page}&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,
        { ...config(context) }
      );
      return notifications.data;
    } catch (error) {
      throw error;
    }
  },
};
