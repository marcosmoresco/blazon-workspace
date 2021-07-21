import axios from "axios";
import { config } from "../utils";

export const DirectoryQueries = {
  getDirectoryResource: async (parent: any, args: any, context: any) => {
    try {
      const resource = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/resources/${args?.id}?expand=true`,
        { ...config(context) }
      );
      return resource.data;
    } catch (error) {
      throw error;
    }
  },
  getDirectoryResourceEntitlements: async (
    parent: any,
    args: any,
    context: any
  ) => {
    try {
      const resource = await axios.get(
        `${
          process.env.SERVER_HOST
        }/blazon-workspace-backend/workspace/directory/resources/${
          args?.id
        }/entitlements?page=${args?.page}&size=${args?.size}${
          args?.ord ? `&ord=${args.ord}` : ""
        }`,
        { ...config(context) }
      );
      return resource.data;
    } catch (error) {
      throw error;
    }
  },
  getDirectoryEntitlement: async (parent: any, args: any, context: any) => {
    try {
      const entitlement = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/entitlements/${args?.id}?expand=true`,
        { ...config(context) }
      );
      return entitlement.data;
    } catch (error) {
      throw error;
    }
  },
  getDirectoryRole: async (parent: any, args: any, context: any) => {
    try {
      const entitlement = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/roles/${args?.id}?expand=true`,
        { ...config(context) }
      );
      return entitlement.data;
    } catch (error) {
      throw error;
    }
  },
  getDirectoryRoleRights: async (parent: any, args: any, context: any) => {
    try {
      const entitlement = await axios.get(
        `${
          process.env.SERVER_HOST
        }/blazon-workspace-backend/workspace/directory/roles/${
          args?.id
        }/rights?page=${args?.page}&size=${args?.size}${
          args?.ord ? `&ord=${args.ord}` : ""
        }`,
        { ...config(context) }
      );
      return entitlement.data;
    } catch (error) {
      throw error;
    }
  },
  getDirectoryRoleRightEntitlements: async (
    parent: any,
    args: any,
    context: any
  ) => {
    try {
      const entitlement = await axios.get(
        `${
          process.env.SERVER_HOST
        }/blazon-workspace-backend/workspace/directory/roles/${
          args?.id
        }/rights/${args?.rightId}/entitlements?page=${args?.page}&size=${
          args?.size
        }${args?.ord ? `&ord=${args.ord}` : ""}`,
        { ...config(context) }
      );
      return entitlement.data;
    } catch (error) {
      throw error;
    }
  },
};
