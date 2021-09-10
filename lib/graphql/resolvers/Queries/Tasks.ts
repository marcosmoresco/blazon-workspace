import axios from "axios";
import { config } from "../utils";
import { error } from "../../../log";

export const TaskQueries = {  
  getAssignActions: async (parent: any, args: any, context: any) => {
    try {
      const actions = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/tasks/assignactions`, 
        JSON.parse(args?.status || "[]"),      
        { ...config(context) }
      );
      return actions.data;
    } catch (error) {
      throw error;
    }
  },
  getTasks: async (parent: any, args: any, context: any) => {
    try {
      const tasks = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/tasks/filter?expand=true&page=${args?.page}&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,
        {...(JSON.parse(args?.filters || "{}"))},
        { ...config(context) }
      );
            
      if((tasks?.data?.representation || []).length) {
        for( const item of tasks?.data?.representation ) {
          if(item?.headers?.category === "APPROVAL_TASK") {
            try {
              const task = await axios.get(
                `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/${item?.identifier}?expand=true`,           
                { ...config(context) }
              );
              item.justification = task?.data?.justification;
              item.approvalItemDetails = task?.data?.approvalItemDetails;
              item.type = task?.data?.type;       
            } catch(e) {
              error(`Èrror in details item by identifier=${item?.identifier}`);
            }              
          } else if(item?.headers?.category === "ROLE_RIGHT_TASK") {
            try {
              const task = await axios.get(
                `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/${item?.identifier}?expand=true`,           
                { ...config(context) }
              );
              item.justification = task?.data?.justification;
              item.itemDetails = task?.data?.itemDetails;
              item.type = task?.data?.type;  
            } catch(e) {
              error(`Èrror in details item by identifier=${item?.identifier}`);
            }                                  
          } else if(item?.headers?.category === "CERTIFICATION_TASK") {
            try {
              const task = await axios.get(
                `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/${item?.identifier}?expand=true`,           
                { ...config(context) }
              );
              item.justification = task?.data?.justification;
              item.certificationItemDetails = task?.data?.certificationItemDetails;
              item.type = task?.data?.type;         
            } catch(e) {
              error(`Èrror in details item by identifier=${item?.identifier}`);
            }     
          } else if(item?.headers?.category === "PROVISIONING_TASK") {
            try {
              const task = await axios.get(
                `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/${item?.identifier}?expand=true`,           
                { ...config(context) }
              );
              item.justification = task?.data?.justification;
              item.provisioningItemDetail = task?.data?.provisioningItemDetail;
              item.type = task?.data?.type;            
            } catch(e) {
              error(`Èrror in details item by identifier=${item?.identifier}`);
            } 
          } else if(item?.headers?.category === "SOD_TASK") {
            try {
              const task = await axios.get(
                `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/${item?.identifier}?expand=true`,           
                { ...config(context) }
              );
              item.justification = task?.data?.justification;
              item.approvalItemDetails = task?.data?.approvalItemDetails;
              item.type = task?.data?.type;
            } catch(e) {
              error(`Èrror in details item by identifier=${item?.identifier}`);
            }            
          }
        };
      }     
      return tasks.data;
    } catch (error) {
      throw error;
    }
  },
  getRequestApprovalTasksAvailableActions: async (parent: any, args: any, context: any) => {
    try {
      const availableActions = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/availableactions`,   
        JSON.parse(args?.status || "[]"),     
        { ...config(context) }
      );
      return availableActions.data;
    } catch (error) {
      throw error;
    }
  },
  getRequestApprovalTasks: async (parent: any, args: any, context: any) => {
    try {
      const tasks = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/filter?expand=true&page=${args?.page}&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,   
        {...(JSON.parse(args?.filters || "{}"))},     
        { ...config(context) }
      );
      return tasks.data;
    } catch (error) {
      throw error;
    }
  },
  getRequestApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      const task = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/${args?.id}?expand=true`,           
        { ...config(context) }
      );
      return task.data;
    } catch (error) {
      throw error;
    }
  },
  getRequestApprovalTaskFilters: async (parent: any, args: any, context: any) => {
    try {
      const filters = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/requests/approvaltasks/filters?type=${args?.type || "ANY"}`,        
        { ...config(context) }
      );
      return filters.data;
    } catch (error) {
      throw error;
    }
  },
  getCertificationApprovalTasksAvailableActions: async (parent: any, args: any, context: any) => {
    try {
      const availableActions = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/availableactions`,   
        JSON.parse(args?.status || "[]"),     
        { ...config(context) }
      );
      return availableActions.data;
    } catch (error) {
      throw error;
    }
  },
  getCertificationApprovalTasks: async (parent: any, args: any, context: any) => {
    try {
      const tasks = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/filter?expand=true&page=${args?.page}&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,   
        {...(JSON.parse(args?.filters || "{}"))},     
        { ...config(context) }
      );
      return tasks.data;
    } catch (error) {
      throw error;
    }
  },
  getCertificationApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      const task = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/${args?.id}?expand=true`,   
        { ...config(context) }      
      );
      return task.data;
    } catch (error) {
      throw error;
    }
  },
  getCertificationApprovalTaskFilters: async (parent: any, args: any, context: any) => {
    try {
      const filters = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/certifications/approvaltasks/filters?type=${args?.type || "ANY"}`,        
        { ...config(context) }
      );
      return filters.data;
    } catch (error) {
      throw error;
    }
  },
  getSoDApprovalTasksAvailableActions: async (parent: any, args: any, context: any) => {
    try {
      const availableActions = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/availableactions`,   
        JSON.parse(args?.status || "[]"),     
        { ...config(context) }
      );
      return availableActions.data;
    } catch (error) {
      throw error;
    }
  },
  getSoDApprovalTasks: async (parent: any, args: any, context: any) => {
    try {
      const tasks = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/filter?expand=true&page=${args?.page}&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,   
        {...(JSON.parse(args?.filters || "{}"))},     
        { ...config(context) }
      );
      return tasks.data;
    } catch (error) {
      throw error;
    }
  },
  getSoDApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      const task = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/${args?.id}?expand=true`,           
        { ...config(context) }
      );
      return task.data;
    } catch (error) {
      throw error;
    }
  },
  getSoDApprovalTaskFilters: async (parent: any, args: any, context: any) => {
    try {
      const filters = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/sod/approvaltasks/filters?type=${args?.type || "ANY"}`,        
        { ...config(context) }
      );
      return filters.data;
    } catch (error) {
      throw error;
    }
  },
  getRoleRightApprovalTasksAvailableActions: async (parent: any, args: any, context: any) => {
    try {
      const availableActions = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/availableactions`,   
        JSON.parse(args?.status || "[]"),     
        { ...config(context) }
      );
      return availableActions.data;
    } catch (error) {
      throw error;
    }
  },
  getRoleRightApprovalTasks: async (parent: any, args: any, context: any) => {
    try {
      const tasks = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/filter?page=${args?.page}&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,   
        {...(JSON.parse(args?.filters || "{}"))},     
        { ...config(context) }
      );
      return tasks.data;
      
    } catch (error) {
      throw error;
    }
  },
  getRoleRightApprovalTask: async (parent: any, args: any, context: any) => {
    try {
      const task = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/${args?.id}?expand=true`,            
        { ...config(context) }
      );
      return task.data;
      
    } catch (error) {
      throw error;
    }
  },
  getRoleRightApprovalTaskItems: async (parent: any, args: any, context: any) => {
    try {
      const items = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/${args?.id}/items`,            
        { ...config(context) }
      );
      return items.data;
      
    } catch (error) {
      throw error;
    }
  },
  getRoleRightApprovalTaskFilters: async (parent: any, args: any, context: any) => {
    try {
      const filters = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/rolerights/approvaltasks/filters?type=${args?.type || "ANY"}`,        
        { ...config(context) }
      );
      return filters.data;
    } catch (error) {
      throw error;
    }
  },
  getProvisioningTasksAvailableActions: async (parent: any, args: any, context: any) => {
    try {
      const availableActions = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/availableactions`,   
        JSON.parse(args?.status || "[]"),     
        { ...config(context) }
      );
      return availableActions.data;
    } catch (error) {
      throw error;
    }
  },
  getProvisioningTasks: async (parent: any, args: any, context: any) => {
    try {
      const tasks = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/filter?expand=true&page=${args?.page}&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,   
        {...(JSON.parse(args?.filters || "{}"))},     
        { ...config(context) }
      );
      return tasks.data;
    } catch (error) {
      throw error;
    }
  },
  getProvisioningTask: async (parent: any, args: any, context: any) => {
    try {
      const task = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/${args?.id}?expand=true`,          
        { ...config(context) }
      );
      return task.data;
    } catch (error) {
      throw error;
    }
  },
  getProvisioningTaskFilters: async (parent: any, args: any, context: any) => {
    try {
      const filters = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/tasks/filters?type=${args?.type || "ANY"}`,        
        { ...config(context) }
      );
      return filters.data;
    } catch (error) {
      throw error;
    }
  }, 
};
