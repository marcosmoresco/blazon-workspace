import { FormattedMessage, IntlShape } from "react-intl";
import { Theme } from "@material-ui/core/styles";
import type { FilterType } from "@components/Filter/types";
import { Task, TaskFilter } from "./types";
import { confirm } from "@components/Dialog/actions";
import XCircleIcon from "@icons/XCircle";
import CheckCircleIcon from "@icons/CheckCircle";
import ShareIcon from "@icons/Share";

import apolloClient from "@utils/apollo-client";

//queries
import { GET_USER_FULL_TEXT } from "@modules/User/queries";
import { 
  GET_TASKS,
  GET_REQUEST_APPROVAL_TASK,
  GET_CERTIFICATION_APPROVAL_TASK,
  GET_ROLE_RIGHT_APPROVAL_TASK,
  GET_SOD_APPROVAL_TASK,
  GET_PROVISIONING_TASK, 
  GET_REQUEST_APPROVAL_TASKS,
  GET_CERTIFICATION_APPROVAL_TASKS,
  GET_PROVISIONING_TASKS,
  GET_ROLE_RIGHT_APPROVAL_TASKS,
  GET_SOD_APPROVAL_TASKS,
  GET_TASK_QUEUE_TASKS
} from "@modules/Task/queries";

//mutations
import {
  ASSIGN_TO_ME_TASK,
  UNASSIGN_TASK,
  FORWARD_TO_USER_TASK,
  FORWARD_TO_QUEUE_TASK,
  ASSIGN_TO_ME_REQUEST_APPROVAL_TASK,
  UNASSIGN_REQUEST_APPROVAL_TASK,
  FORWARD_TO_USER_REQUEST_APPROVAL_TASK,
  FORWARD_TO_QUEUE_REQUEST_APPROVAL_TASK,
  RESOLVE_REQUEST_APPROVAL_TASK,
  ASSIGN_TO_ME_CERTIFICATION_APPROVAL_TASK,
  UNASSIGN_CERTIFICATION_APPROVAL_TASK,
  FORWARD_TO_USER_CERTIFICATION_APPROVAL_TASK,
  FORWARD_TO_QUEUE_CERTIFICATION_APPROVAL_TASK,
  RESOLVE_CERTIFICATION_APPROVAL_TASK,
  ASSIGN_TO_ME_ROLE_RIGHT_APPROVAL_TASK,
  UNASSIGN_ROLE_RIGHT_APPROVAL_TASK,
  FORWARD_TO_USER_ROLE_RIGHT_APPROVAL_TASK,
  FORWARD_TO_QUEUE_ROLE_RIGHT_APPROVAL_TASK,
  RESOLVE_ROLE_RIGHT_APPROVAL_TASK,
  ASSIGN_TO_ME_SOD_APPROVAL_TASK,
  UNASSIGN_SOD_APPROVAL_TASK,
  FORWARD_TO_USER_SOD_APPROVAL_TASK,
  FORWARD_TO_QUEUE_SOD_APPROVAL_TASK,
  RESOLVE_SOD_APPROVAL_TASK,
  ASSIGN_TO_ME_PROVISIONING_TASK,
  UNASSIGN_PROVISIONING_TASK,
  FORWARD_TO_USER_PROVISIONING_TASK,
  FORWARD_TO_QUEUE_PROVISIONING_TASK,
  RESOLVE_PROVISIONING_TASK 
} from "@modules/Task/mutations";

export const filters: FilterType[] = [
  {
    orderable: true,
    name: "identifier",
    label: <FormattedMessage id="identifier" />,
    type: "number",
  },  
  {
    orderable: true,
    name: "priority",
    label: <FormattedMessage id="task.priority" />,
    type: "list",
    values: [
      {
        label: <FormattedMessage id="task.priority.LOW" />,
        value: "LOW"
      },
      {
        label: <FormattedMessage id="task.priority.MEDIUM" />,
        value: "MEDIUM"
      },
      {
        label: <FormattedMessage id="task.priority.HIGH" />,
        value: "HIGH"
      },
      {
        label: <FormattedMessage id="task.priority.CRITICAL" />,
        value: "CRITICAL"
      },
    ],
    bind: "value",
    view: "label"
  },
  {
    orderable: true,
    name: "requester",
    label: <FormattedMessage id="task.requester" />,
    type: "list",
    view: "displayName",
    async: (dispatch: any, query: string, callback: any) => {
      apolloClient
        .query({
          query: GET_USER_FULL_TEXT,
          variables: {
            size: 10,
            q: query || ""
          }
        })
        .then(({ data }) => {
          callback(
            data?.getUserFullText.map((u: any) => ({
              ...u
            }))
          )
        })
    }
  },
  {
    orderable: true,
    name: "recipient",
    label: <FormattedMessage id="task.recipient" />,
    type: "list",
    view: "displayName",
    async: (dispatch: any, query: string, callback: any) => {
      apolloClient
        .query({
          query: GET_USER_FULL_TEXT,
          variables: {
            size: 10,
            q: query || ""
          }
        })
        .then(({ data }) => {
          callback(
            data?.getUserFullText.map((u: any) => ({
              ...u
            }))
          )
        })
    }
  },
  {
    orderable: true,
    name: "createdAt",
    label: <FormattedMessage id="createdAt" />,
    type: "date",
    bind: {
      start: "initCreatedAt",
      end: "endCreatedAt"
    }
  },
  {
    orderable: true,
    name: "resolvedAt",
    label: <FormattedMessage id="resolvedAt" />,
    type: "date",
    bind: {
      start: "initFinishedAt",
      end: "endFinishedAt"
    }
  },
];

export const types = [
  {
    label: <FormattedMessage id="task.all" />,
    value: "ALL",
  },
  {
    label:  <FormattedMessage id="task.approval" />,
    value: "APPROVAL",
  },
  {
    label: <FormattedMessage id="task.certification" />,
    value: "CERTIFICATION",
  },
  {
    label: <FormattedMessage id="task.provisioning" />,
    value: "PROVISIONING",
  },
  {
    label: <FormattedMessage id="task.sod" />,
    value: "SOD",
  },
  {
    label:<FormattedMessage id="task.roleRight" />,
    value: "ROLE_RIGHT",
  },
];

export const sections = [
  {   
    name: "tasks.waitingResolution",
    value: "TASKS_PERSONAL",
  },
  {   
    name: "tasks.waitingAssignment",
    value: "TASKS",
  },  
  {   
    name: "tasks.resolved",
    value: "TASKS_RESOLVED",
  },
];

export const queueCategories = [
  {
    label: <FormattedMessage id="task.any" />,
    value: "ANY",
  },
  {
    label:  <FormattedMessage id="task.approval" />,
    value: "APPROVAL_TASK",
  },
  {
    label: <FormattedMessage id="task.certification" />,
    value: "CERTIFICATION_TASK",
  },
  {
    label: <FormattedMessage id="task.provisioning" />,
    value: "PROVISIONING_TASK",
  },
  {
    label: <FormattedMessage id="task.sod" />,
    value: "SOD_TASK",
  },
  {
    label:<FormattedMessage id="task.roleRight" />,
    value: "ROLE_RIGHT_TASK",
  },
];

export const queueTypes: {[key: string]: any} = {
  'ANY': [{
    label: <FormattedMessage id="task.any" />,
    value: "ANY",
  }],
  'APPROVAL_TASK': [{
    label: <FormattedMessage id="task.any" />,
    value: 'ANY'
  }, {
    label:  <FormattedMessage id="task.type.CREATE_ACCOUNT" />,
    value: 'CREATE_ACCOUNT'
  }, {
    label:  <FormattedMessage id="task.type.ASSIGN_ENTITLEMENT" />,
    value: 'ASSIGN_ENTITLEMENT'
  }, {
    label:  <FormattedMessage id="task.type.ASSIGN_ROLE" />,
    value: 'ASSIGN_ROLE'
  }, {
    label:  <FormattedMessage id="task.type.CHECKIN_ADMIN_ACCOUNT_PASSWORD" />,
    value: 'CHECKIN_ADMIN_ACCOUNT_PASSWORD'
  }],
  'CERTIFICATION_TASK': [{
    label:  <FormattedMessage id="task.any" />,
    value: 'ANY'
  }, {
    label:  <FormattedMessage id="task.type.ACCOUNT" />,
    value: 'ACCOUNT'
  }, {
    label:  <FormattedMessage id="task.type.MEMBERSHIP_ROLE" />,
    value: 'MEMBERSHIP_ROLE'
  }, {
    label:  <FormattedMessage id="task.type.MEMBERSHIP_ENTITLEMENT" />,
    value: 'MEMBERSHIP_ENTITLEMENT'
  }],
  'PROVISIONING_TASK': [{
    label:  <FormattedMessage id="task.any" />,
    value: 'ANY'
  }, {
    label:  <FormattedMessage id="task.type.CHANGE_PASSWORD" />,   
    value: 'CHANGE_PASSWORD'
  }, {
    label:  <FormattedMessage id="task.type.CREATE_ACCOUNT" />,      
    value: 'CREATE_ACCOUNT'
  }, {
    label:  <FormattedMessage id="task.type.UPDATE_ACCOUNT" />,   
    value: 'UPDATE_ACCOUNT'
  }, {
    label:  <FormattedMessage id="task.type.REVOKE_ACCOUNT" />,   
    value: 'REVOKE_ACCOUNT'
  }, {
    label:  <FormattedMessage id="task.type.ACTIVATE_ACCOUNT" />,    
    value: 'ACTIVATE_ACCOUNT'
  }, {
    label:  <FormattedMessage id="task.type.INACTIVATE_ACCOUNT" />,    
    value: 'INACTIVATE_ACCOUNT'
  }, {
    label:  <FormattedMessage id="task.type.GRANT_ENTITLEMENT" />,    
    value: 'GRANT_ENTITLEMENT'
  }, {
    label:  <FormattedMessage id="task.type.REVOKE_ENTITLEMENT" />,   
    value: 'REVOKE_ENTITLEMENT'
  }, {
    label:  <FormattedMessage id="task.type.CREATE_ENTITLEMENT" />,    
    value: 'CREATE_ENTITLEMENT'
  }, {
    label:  <FormattedMessage id="task.type.REMOVE_ENTITLEMENT" />, 
    value: 'REMOVE_ENTITLEMENT'
  }, {
    label:  <FormattedMessage id="task.type.UPDATE_ENTITLEMENT" />, 
    value: 'UPDATE_ENTITLEMENT'
  }],
  'SOD_TASK': [{
    label:  <FormattedMessage id="task.any" />,
    value: 'ANY'
  }, {
    label:  <FormattedMessage id="task.type.ACCOUNT" />,
    value: 'ACCOUNT'
  }, {
    label:  <FormattedMessage id="task.type.MEMBERSHIP_ENTITLEMENT" />,
    value: 'MEMBERSHIP_ENTITLEMENT'
  }, {
    label:  <FormattedMessage id="task.type.MEMBERSHIP_ROLE" />,
    value: 'MEMBERSHIP_ROLE'
  }]
};

export const generateFilters = (intl: IntlShape, list: TaskFilter[]) => {

  const filters: FilterType[] = [];
    
  list.forEach((filter: TaskFilter) => {          
    if(filter.clauses) {            
      const clause = filter.clauses[0]
      const type = clause.type
      let currentFilter: FilterType = {
        type: "",
        orderable: filter.orderable,
        name: filter.value,
        label: intl.formatMessage({
          id: filter.label
        })              
      }
      if(type === 'STRING' || type === 'NUMBER' ) {
        currentFilter.type = type === 'STRING' ? 'text' : 'number'              
      } else if(type === 'ENUM') {
        currentFilter.type = 'list'
        currentFilter.values = clause.fields.map((f: any) => ({label: f, value: f}))
        currentFilter.bind = 'value'
        currentFilter.view = 'label'              
      } else if(type === 'BOOLEAN') {
        currentFilter.type = 'boolean'
        currentFilter.defaultValue = true
      } else if(type === 'DATETIME') {              
        currentFilter.type = 'date'
        currentFilter.bind = {
          start: filter.clauses[0].value,
          end: filter.clauses[1].value
        }
      }

      filters.push(currentFilter)
    }
  });

  return filters;
};

interface CallbackAction<T1 = void> {
  (): T1;
}

export const assignToMe = async (task: Task | undefined, intl: IntlShape, callback: CallbackAction, theme: Theme) => {

  const result = await confirm(
    intl.formatMessage({
      id: "task.assignToMe.confirm",
    }),
    intl.formatMessage({
      id: "task.assignToMe.confirm.text",
    }),
    <ShareIcon width={48} height={48} color={theme.palette.primary.main || "#0E46D7"} /> ,
    null,
    theme  
  );

  if(result) {
    callback();
  }
}

export const unassign = async (task: Task | undefined, intl: IntlShape, callback: CallbackAction, theme: Theme) => {

  const result = await confirm(
    intl.formatMessage({
      id: "task.unassign.confirm",
    }),
    intl.formatMessage({
      id: "task.unassign.confirm.text",
    }),
    <XCircleIcon width={48} height={48} color="#FF134A" />,
    null,
    theme
  );

  if(result) {
    callback();
  }
}

export const approve = async (task: Task | undefined, intl: IntlShape, callback: CallbackAction, theme: Theme) => {

  const result = await confirm(
    intl.formatMessage({
      id: "task.approve.confirm",
    }),
    intl.formatMessage({
      id: "task.approve.confirm.text",
    }),
    <CheckCircleIcon width={48} height={48} color={theme.palette.primary.main || "#0E46D7"} />,
    null,
    theme
  );

  if(result) {
    callback();
  }
}

export const disapprove = async (task: Task, intl: IntlShape, callback: CallbackAction, theme: Theme) => {

  const result = await confirm(
    intl.formatMessage({
      id: "task.disapprove.confirm",
    }),
    intl.formatMessage({
      id: "task.disapprove.confirm.text",
    }),
    <XCircleIcon width={48} height={48} color="#FF134A" />,
    null,
    theme
  );

  if(result) {
    callback();
  }
}

export const certify = async (task: Task | undefined, intl: IntlShape, callback: CallbackAction, theme: Theme) => {

  const result = await confirm(
    intl.formatMessage({
      id: "task.certify.confirm",
    }),
    intl.formatMessage({
      id: "task.certify.confirm.text",
    }),
    <CheckCircleIcon width={48} height={48} color={theme.palette.primary.main || "#0E46D7"} />,
    null,
    theme
  );

  if(result) {
    callback();
  }
}

export const provision = async (task: Task | undefined, intl: IntlShape, callback: CallbackAction, theme: Theme) => {

  const result = await confirm(
    intl.formatMessage({
      id: "task.provision.confirm",
    }),
    intl.formatMessage({
      id: "task.provision.confirm.text",
    }),
    <CheckCircleIcon width={48} height={48} color={theme.palette.primary.main || "#0E46D7"} />,
    null,
    theme
  );

  if(result) {
    callback();
  }
}

export const resolve = async (task: Task | undefined, intl: IntlShape, callback: CallbackAction, theme: Theme) => {

  const result = await confirm(
    intl.formatMessage({
      id: "task.resolve.confirm",
    }),
    intl.formatMessage({
      id: "task.resolve.confirm.text",
    }),
    <CheckCircleIcon width={48} height={48} color={theme.palette.primary.main || "#0E46D7"} />,
    null,
    theme
  );

  if(result) {
    callback();
  }
}

export const notAllowed = async (task: Task | undefined, intl: IntlShape, callback: CallbackAction, theme: Theme) => {

  const result = await confirm(
    intl.formatMessage({
      id: "task.notAllowed.confirm",
    }),
    intl.formatMessage({
      id: "task.notAllowed.confirm.text",
    }),
    <CheckCircleIcon width={48} height={48} color={theme.palette.primary.main || "#0E46D7"} />,
    null,
    theme
  );

  if(result) {
    callback();
  }
}

export const getActionsByType = (type?: any): any => {
  let result: {[key: string] : any} = {};
  if(type === "approval") {
    result.assignToMe = ASSIGN_TO_ME_REQUEST_APPROVAL_TASK;
    result.unassign = UNASSIGN_REQUEST_APPROVAL_TASK;
    result.forwardToUser = FORWARD_TO_USER_REQUEST_APPROVAL_TASK;
    result.forwardToQueue = FORWARD_TO_QUEUE_REQUEST_APPROVAL_TASK;
    result.resolve = RESOLVE_REQUEST_APPROVAL_TASK;      
  } else if(type === "certification") {
    result.assignToMe = ASSIGN_TO_ME_CERTIFICATION_APPROVAL_TASK;
    result.unassign = UNASSIGN_CERTIFICATION_APPROVAL_TASK;
    result.forwardToUser = FORWARD_TO_USER_CERTIFICATION_APPROVAL_TASK;
    result.forwardToQueue = FORWARD_TO_QUEUE_CERTIFICATION_APPROVAL_TASK;
    result.resolve = RESOLVE_CERTIFICATION_APPROVAL_TASK; 
  } else if(type === "provisioning") {
    result.assignToMe = ASSIGN_TO_ME_PROVISIONING_TASK;
    result.unassign = UNASSIGN_PROVISIONING_TASK;
    result.forwardToUser = FORWARD_TO_USER_PROVISIONING_TASK;
    result.forwardToQueue = FORWARD_TO_QUEUE_PROVISIONING_TASK;
    result.resolve = RESOLVE_PROVISIONING_TASK;
  } else if(type === "roleRight") { 
    result.assignToMe = ASSIGN_TO_ME_ROLE_RIGHT_APPROVAL_TASK;
    result.unassign = UNASSIGN_ROLE_RIGHT_APPROVAL_TASK;
    result.forwardToUser = FORWARD_TO_USER_ROLE_RIGHT_APPROVAL_TASK;
    result.forwardToQueue = FORWARD_TO_QUEUE_ROLE_RIGHT_APPROVAL_TASK;
    result.resolve = RESOLVE_ROLE_RIGHT_APPROVAL_TASK; 
  } else if(type === "sod") {
    result.assignToMe = ASSIGN_TO_ME_SOD_APPROVAL_TASK;
    result.unassign = UNASSIGN_SOD_APPROVAL_TASK;
    result.forwardToUser = FORWARD_TO_USER_SOD_APPROVAL_TASK;
    result.forwardToQueue = FORWARD_TO_QUEUE_SOD_APPROVAL_TASK;
    result.resolve = RESOLVE_SOD_APPROVAL_TASK; 
  } else {
    result.assignToMe = ASSIGN_TO_ME_TASK;
    result.unassign = UNASSIGN_TASK;
    result.forwardToUser = FORWARD_TO_USER_TASK;
    result.forwardToQueue = FORWARD_TO_QUEUE_TASK;
  }
  
  return result;
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

export const getQueryListByType = (type: any): any => {
  let query = null;
  if(type === "approval") {
    query = GET_REQUEST_APPROVAL_TASKS;
  } else if(type === "certification") {
    query = GET_CERTIFICATION_APPROVAL_TASKS;
  } else if(type === "provisioning") {
    query = GET_PROVISIONING_TASKS;
  } else if(type === "roleRight") { 
    query = GET_ROLE_RIGHT_APPROVAL_TASKS;
  } else if(type === "sod") {
    query = GET_SOD_APPROVAL_TASKS;
  } else if(type === "any") {
    query = GET_TASKS;
  } else {
    query = GET_TASK_QUEUE_TASKS;
  }
  
  return query;
};