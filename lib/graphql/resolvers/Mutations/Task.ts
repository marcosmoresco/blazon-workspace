import axios from "axios";
import { config } from "../utils";

export const TaskMutations = {
  assignToMeTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/tasks/assigntasktome`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  unassignTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/tasks/unassigntask`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToUserTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/tasks/forwardtasktouser`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToQueueTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/tasks/forwardtasktoqueue`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  addRequestApprovalTaskComment: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/${args.id}/comments`,
        {
          task: {
            identifier: args.id,
          },
          user: {
            identifier: context.req?.session?.passport?.user?.id,
          },
          comment: args.comment,
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  assignToMeRequestApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/assigntasktome`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  unassignRequestApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/unassigntask`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToUserRequestApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/forwardtasktouser`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToQueueRequestApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/forwardtasktoqueue`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  resolveRequestApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/resolve`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  addCertificationApprovalTaskComment: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/${args.id}/comments`,
        {
          task: {
            identifier: args.id,
          },
          user: {
            identifier: context.req?.session?.passport?.user?.id,
          },
          comment: args.comment,
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  assignToMeCertificationApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/assigntasktome`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  unassignCertificationApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/unassigntask`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToUserCertificationApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/forwardtasktouser`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToQueueCertificationApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/forwardtasktoqueue`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  resolveCertificationApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/resolve`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  addSoDApprovalTaskComment: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/${args.id}/comments`,
        {
          task: {
            identifier: args.id,
          },
          user: {
            identifier: context.req?.session?.passport?.user?.id,
          },
          comment: args.comment,
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  assignToMeSoDApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/assigntasktome`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  unassignSoDApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/unassigntask`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToUserSoDApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/forwardtasktouser`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToQueueSoDApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/forwardtasktoqueue`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  resolveSoDApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/resolve`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  addRoleRightApprovalTaskComment: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/${args.id}/comments`,
        {
          task: {
            identifier: args.id,
          },
          user: {
            identifier: context.req?.session?.passport?.user?.id,
          },
          comment: args.comment,
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  assignToMeRoleRightApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/assigntasktome`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  unassignRoleRightApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/unassigntask`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToUserRoleRightApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/forwardtasktouser`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToQueueRoleRightApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/forwardtasktoqueue`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  resolveRoleRightApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/resolve`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  approveRoleRightApprovalTaskItems: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/${args.id}/approveitems`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  }, 
  addProvisioningTaskComment: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/${args.id}/comments`,
        {
          task: {
            identifier: args.id,
          },
          user: {
            identifier: context.req?.session?.passport?.user?.id,
          },
          comment: args.comment,
        },
        { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  assignToMeProvisioningTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/assigntasktome`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  unassignProvisioningTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/unassigntask`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToUserProvisioningTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/forwardtasktouser`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  forwardToQueueProvisioningTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/forwardtasktoqueue`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  resolveProvisioningTask: async (parent: any, args: any, context: any) => {
    try {
      await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/resolve`,
         JSON.parse(args?.payload),
         { ...config(context) }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
};
