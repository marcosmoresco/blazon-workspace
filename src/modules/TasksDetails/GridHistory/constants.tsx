//mutations
import { 
  ADD_REQUEST_APPROVAL_TASK_COMMENT,
  ADD_CERTIFICATION_APPROVAL_TASK_COMMENT,
  ADD_PROVISIONING_TASK_COMMENT,
  ADD_ROLE_RIGHT_APPROVAL_TASK_COMMENT, 
  ADD_SOD_APPROVAL_TASK_COMMENT
} from "@modules/Task/mutations";

//queries
import { 
  GET_REQUEST_APPROVAL_TASK,
  GET_CERTIFICATION_APPROVAL_TASK,
  GET_PROVISIONING_TASK,
  GET_ROLE_RIGHT_APPROVAL_TASK,
  GET_SOD_APPROVAL_TASK
} from "@modules/Task/queries";

export const addCommentByType = (type: any): any => {
  let mutation = null;
  if(type === "approval") {
    mutation = ADD_REQUEST_APPROVAL_TASK_COMMENT;
  } else if(type === "certification") {
    mutation = ADD_CERTIFICATION_APPROVAL_TASK_COMMENT;
  } else if(type === "provisioning") {
    mutation = ADD_PROVISIONING_TASK_COMMENT;
  } else if(type === "roleRight") { 
    mutation = ADD_ROLE_RIGHT_APPROVAL_TASK_COMMENT;
  } else if(type === "sod") {
    mutation = ADD_SOD_APPROVAL_TASK_COMMENT;
  }
  return mutation;
};

export const getQueryByType = (type: any): any => {
  let query = null;
  if(type === "approval") {
    query = GET_REQUEST_APPROVAL_TASK;
  } else if(type === "certification") {
    query = GET_CERTIFICATION_APPROVAL_TASK;
  } else if(type === "provisioning") {
    query = GET_PROVISIONING_TASK;
  } else if(type === "roleRight") { 
    query = GET_ROLE_RIGHT_APPROVAL_TASK;
  } else if(type === "sod") {
    query = GET_SOD_APPROVAL_TASK;
  }
  
  return query;
};
