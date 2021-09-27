import type { User, Link } from "@types";

export type TaskDates = {
  createdDate: string;
  resolvedDate: string;
  deadline: string;
};

export type TaskHeaders = {
  category: string;
  createdBy: string;
  createdByObjectId: string;
  priority: string;
  status: string;
  result: string;
  from: User;
  recipient: User;
};

export type TaskApprovalItemDetails = {
  resourceRisk: string;
  resourceName: string;
  resourceIdentifier: number;
  resourceDescription: string;
  roleName: string;
  roleIdentifier: number;
  roleDescription: string;
  entitlementName: string;
  entitlementIdentifier: number;
  entitlementDescription: string;
  account: TaskProvisioningItemDetailAccount;
};

export type TaskCertificationItemDetails = {
  resourceRisk: string;
  resourceName: string;
  resourceIdentifier: number;
  resourceDescription: string;
  roleName: string;
  roleIdentifier: number;
  roleDescription: string;
  entitlementName: string;
  entitlementIdentifier: number;
  entitlementDescription: string;
  accountIdentifier: string;
};

export type TaskItemDetails = {
  action: string;
  justification: string;
  roleId: number;
  roleName: string;
  roleDescription: string;
  roleRisk: string;
};

export type TaskProvisioningItemDetailAccount = {    
  accountIdentifier: string;
  identifier: number;   
}

export type TaskProvisioningItemDetailResource = {
  name: string;
  description: string;
  identifier: number;
  risk: string;
}

export type TaskProvisioningItemDetailEntitlement = {  
  name: string;
  description: string;
  identifier: number;
  risk: string;  
}

export type TaskProvisioningItemDetail = {
  account: TaskProvisioningItemDetailAccount;
  resource: TaskProvisioningItemDetailResource;
  entitlement: TaskProvisioningItemDetailEntitlement;
}

export type TaskComment = {
  comment: string;
  date: number;
  identifier: number;
  user: User;
};

export type TaskHistory = {
  date: string;
  to: User;
  from: User;
};

export type Task = {
  identifier: number;
  justification: string;
  revokeJustification: string;
  disapprovalJustification: string;
  allowedJustification: string;
  dates: TaskDates;
  headers: TaskHeaders;
  approvalItemDetails: TaskApprovalItemDetails;
  certificationItemDetails: TaskCertificationItemDetails;
  itemDetails: TaskItemDetails;
  provisioningItemDetail: TaskProvisioningItemDetail;
  comments: [TaskComment];
  assignHistory: [TaskHistory];
  type: string;
  entrySchema: string;
  links: [Link];
};

export type ListProps = {
  dispatch?: any;
  list?: Task[];
  checked?: number[];
  onCheck?: any;
  checkAll?: boolean;
  setCheckAll?: any;
  type?: string;
  subType?: string;
  size?: number;
  filtered?: any;
  filteredString?: string;
  id?: number;
  isQueue?: boolean;
  resolved?: boolean;
  task?: Task;
  orderBy?: string;
};

export type TaskFilterClause = {
  label: string;
  type: string;
  value: string;
  fields: any;
};

export type TaskFilter = {
  orderable: Boolean | undefined;
  value: string;
  label: string;
  clauses: TaskFilterClause[];
};

export type TaskQueue = {
  identifier: number;
  name: string;
  description: string;
  amountTasks: number;
  links: [Link];
};

export type TaskQueueRepresentation = {
  links: [Link];
  representation: [TaskQueue];
};

export type RoleRightTaskItemsDetail = {    
  identifier: number;
  approvalStatus: string;
  entryDescription: string;
  entryId: string;
  entryName: string;
  entryType: string;
}

export type RoleRightTaskItems = {
  action: string;
  approvalWorkflowId: number;
  identifier: number;
  items: [RoleRightTaskItemsDetail]
}

export type TaskAssignHistoryType = {
  name: string;
  type: string;
  identifier: number;
  links: [Link];
} 

export type TaskAssignHistory = {
  to: TaskAssignHistoryType;
  from: TaskAssignHistoryType;
  date: string;
  links: [Link];
} 
