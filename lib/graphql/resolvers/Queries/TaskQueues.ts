import axios from "axios";
import { config } from "../utils";
import { error } from "../../../log";

export const TaskQueuesQueries = {  
  getTaskQueueTasks: async (parent: any, args: any, context: any) => {
    try {
      const tasks = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/taskqueues/${args?.id}/tasks/filter?expand=true&page=${args?.page}&size=${args?.size}${args?.ord ? `&ord=${args.ord}` : ""}`,   
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
  getTaskQueuesFilters: async (parent: any, args: any, context: any) => {
    try {
      const queues = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/taskqueues/filters?type=${args.type}&category=${args.category}`,             
        { ...config(context) }
      );
      return queues.data;
    } catch (error) {
      throw error;
    }
  },
  getTaskQueues: async (parent: any, args: any, context: any) => {
    try {
      const queues = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/provisioning/taskqueues/filter?userid=${context.req?.session?.passport?.user?.id}`,             
        {},
        { ...config(context) }
      );
      return queues.data;
    } catch (error) {
      throw error;
    }
  },  
};
