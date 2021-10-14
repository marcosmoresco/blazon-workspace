//queries
import { 
  GET_REQUEST_APPROVAL_TASKS_AVAILABLE_ACTIONS,
  GET_CERTIFICATION_APPROVAL_TASKS_AVAILABLE_ACTIONS,
  GET_PROVISIONING_TASKS_AVAILABLE_ACTIONS,
  GET_ROLE_RIGHT_APPROVAL_TASKS_AVAILABLE_ACTIONS,
  GET_SOD_APPROVAL_TASKS_AVAILABLE_ACTIONS,
  GET_USER_REVALIDATION_TASKS_AVAILABLE_ACTIONS
} from "@modules/Task/queries";

export const getAvailableActionsByType = (type: any): any => {
  let query = null;
  if(type === "approval") {
    query = GET_REQUEST_APPROVAL_TASKS_AVAILABLE_ACTIONS;
  } else if(type === "certification") {
    query = GET_CERTIFICATION_APPROVAL_TASKS_AVAILABLE_ACTIONS;
  } else if(type === "provisioning") {
    query = GET_PROVISIONING_TASKS_AVAILABLE_ACTIONS;
  } else if(type === "roleRight") { 
    query = GET_ROLE_RIGHT_APPROVAL_TASKS_AVAILABLE_ACTIONS;
  } else if(type === "sod") {
    query = GET_SOD_APPROVAL_TASKS_AVAILABLE_ACTIONS;
  } else if (type === "userRevalidation") {
    query = GET_USER_REVALIDATION_TASKS_AVAILABLE_ACTIONS;
  }
  
  return query;
};
