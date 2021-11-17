export const Task = `  

  type TaskFilterClause {
    label: String
    type: String
    value: String
    fields: [String]
  }
  
  type TaskFilter {
    orderable: Boolean
    value: String
    label: String
    clauses: [TaskFilterClause]
  }

  type TaskDates {
    createdDate: String
    resolvedDate: String
    deadline: String
  }

  type TaskHeaders {
    category: String
    createdBy: String
    createdByObjectId: String
    priority: String
    status: String
    result: String
    from: User
    recipient: User
  }
  
  type TaskApprovalItemDetails {
    resourceRisk: String
    resourceName: String
    resourceIdentifier: Int
    resourceDescription: String
    roleName: String
    roleIdentifier: Int
    roleDescription: String
    entitlementName: String
    entitlementIdentifier: Int
    entitlementDescription: String
    account: TaskProvisioningItemDetailAccount
  }

  type TaskCertificationItemDetails {
    resourceRisk: String
    resourceName: String
    resourceIdentifier: Int
    resourceDescription: String
    roleName: String
    roleIdentifier: Int
    roleDescription: String
    entitlementName: String
    entitlementIdentifier: Int
    entitlementDescription: String
    accountIdentifier: String
  }

  type TaskProvisioningItemDetailAccount {    
    accountIdentifier: String
    identifier: Int   
  }

  type TaskProvisioningItemDetailResource {
    name: String
    description: String
    identifier: Int
    risk: String
  }

  type TaskProvisioningItemDetailEntitlement {
    name: String
    description: String   
    identifier: Int
    risk: String
  }

  type TaskProvisioningItemDetail {
    account: TaskProvisioningItemDetailAccount
    resource: TaskProvisioningItemDetailResource
    entitlement: TaskProvisioningItemDetailEntitlement
  }

  type TaskNewUserAttribute {
    key: String
    value: String
  }

  type TaskItemDetails {
    action: String
    justification: String
    roleId: Int
    roleName: String
    roleDescription: String
    roleRisk: String
    newUserAttributes: [TaskNewUserAttribute]
  }

  type TaskComment {
    comment: String
    date: Float   
    identifier: Int
    user: User
  }

  type TaskHistory {
    date: String
    to: User
    from: User
  }

  type RoleRightTaskItemsDetail {    
    identifier: Int
    approvalStatus: String
    entryDescription: String
    entryId: String
    entryName: String
    entryType: String
  }

  type RoleRightTaskItems {
    action: String
    approvalWorkflowId: Int
    identifier: Int
    items: [RoleRightTaskItemsDetail]
  }

  type Task {
    identifier: Int
    justification: String    
    revokeJustification: String
    disapprovalJustification: String
    allowedJustification: String
    dates: TaskDates
    headers: TaskHeaders
    approvalItemDetails: TaskApprovalItemDetails
    itemDetails: TaskItemDetails
    certificationItemDetails: TaskCertificationItemDetails
    provisioningItemDetail: TaskProvisioningItemDetail
    comments: [TaskComment]
    assignHistory: [TaskHistory]    
    type: String
    entrySchema: String
    links: [Link]
  }

  type TaskRepresentation {
    links: [Link]
    representation: [Task]
  } 

  type TaskAssignHistoryType {
    name: String
    type: String
    identifier: Int
    links: [Link]
  } 

  type TaskAssignHistory {
    to: TaskAssignHistoryType
    from: TaskAssignHistoryType
    date: String
    links: [Link]
  } 
`;

export const Queries = `
  getAssignActions(status: String): [String]
  getTasks(page: Int, size: Int, ord: String, filters: String): TaskRepresentation  
  getRequestApprovalTasksAvailableActions(status: String): [String]
  getRequestApprovalTasks(page: Int, size: Int, ord: String, filters: String): TaskRepresentation 
  getRequestApprovalTask(id: Int): Task
  getRequestApprovalTaskFilters(type: String, statusList: String): [TaskFilter]
  getCertificationApprovalTasksAvailableActions(status: String): [String]
  getCertificationApprovalTasks(page: Int, size: Int, ord: String, filters: String): TaskRepresentation
  getCertificationApprovalTask(id: Int): Task
  getCertificationApprovalTaskFilters(type: String, statusList: String): [TaskFilter]
  getSoDApprovalTasksAvailableActions(status: String): [String]
  getSoDApprovalTasks(page: Int, size: Int, ord: String, filters: String): TaskRepresentation
  getSoDApprovalTask(id: Int): Task
  getSoDApprovalTaskFilters(type: String, statusList: String): [TaskFilter] 
  getRoleRightApprovalTasksAvailableActions(status: String): [String]
  getRoleRightApprovalTasks(page: Int, size: Int, ord: String, filters: String): TaskRepresentation
  getRoleRightApprovalTask(id: Int): Task
  getRoleRightApprovalTaskItems(id: Int): RoleRightTaskItems
  getRoleRightApprovalTaskFilters(type: String, statusList: String): [TaskFilter]
  getProvisioningTasksAvailableActions(status: String): [String]
  getProvisioningTasks(page: Int, size: Int, ord: String, filters: String): TaskRepresentation
  getProvisioningTask(id: Int): Task
  getProvisioningTaskFilters(type: String, statusList: String): [TaskFilter]
  getUserTasksAvailableActions(payload: String): [String]
  getUserTasks(page: Int, size: Int, ord: String, filters: String): TaskRepresentation
  getUserTask(id: Int): Task
  getUserTaskFilters(type: String, statusList: String): [TaskFilter]
  getApprovalTasksMergedHistory(id: Int): [TaskAssignHistory]
  getCertificationTasksMergedHistory(id: Int): [TaskAssignHistory]
  getProvisioningTasksMergedHistory(id: Int): [TaskAssignHistory]
  getRoleRightTasksMergedHistory(id: Int): [TaskAssignHistory]
  getSoDTasksMergedHistory(id: Int): [TaskAssignHistory]
  getUserMergedHistory(id: Int): [TaskAssignHistory]
`;

export const Mutations = `
  assignToMeTask(payload: String): Boolean
  unassignTask(payload: String): Boolean
  forwardToUserTask(payload: String): Boolean
  forwardToQueueTask(payload: String): Boolean
  addRequestApprovalTaskComment(id: Int, comment: String): Boolean
  assignToMeRequestApprovalTask(payload: String): Boolean
  unassignRequestApprovalTask(payload: String): Boolean
  forwardToUserRequestApprovalTask(payload: String): Boolean
  forwardToQueueRequestApprovalTask(payload: String): Boolean
  resolveRequestApprovalTask(payload: String): Boolean
  addCertificationApprovalTaskComment(id: Int, comment: String): Boolean
  assignToMeCertificationApprovalTask(payload: String): Boolean
  unassignCertificationApprovalTask(payload: String): Boolean
  forwardToUserCertificationApprovalTask(payload: String): Boolean
  forwardToQueueCertificationApprovalTask(payload: String): Boolean
  resolveCertificationApprovalTask(payload: String): Boolean
  addSoDApprovalTaskComment(id: Int, comment: String): Boolean
  assignToMeSoDApprovalTask(payload: String): Boolean
  unassignSoDApprovalTask(payload: String): Boolean
  forwardToUserSoDApprovalTask(payload: String): Boolean
  forwardToQueueSoDApprovalTask(payload: String): Boolean
  resolveSoDApprovalTask(payload: String): Boolean
  addRoleRightApprovalTaskComment(id: Int, comment: String): Boolean
  assignToMeRoleRightApprovalTask(payload: String): Boolean
  unassignRoleRightApprovalTask(payload: String): Boolean
  forwardToUserRoleRightApprovalTask(payload: String): Boolean
  forwardToQueueRoleRightApprovalTask(payload: String): Boolean
  resolveRoleRightApprovalTask(payload: String): Boolean
  approveRoleRightApprovalTaskItems(id: Int, payload: String): Boolean
  addProvisioningTaskComment(id: Int, comment: String): Boolean
  assignToMeProvisioningTask(payload: String): Boolean
  unassignProvisioningTask(payload: String): Boolean
  forwardToUserProvisioningTask(payload: String): Boolean
  forwardToQueueProvisioningTask(payload: String): Boolean
  resolveProvisioningTask(payload: String): Boolean
  defineAccountIdentifierProvisioningTask(id: Int, accountIdentifier: String): Boolean
  defineUsernamePasswordProvisioningTask(id: Int, username: String, password: String): Boolean
  changePasswordProvisioningTask(id: Int, password: String): Boolean
  addUserTaskComment(id: Int, comment: String): Boolean
  assignToMeUserTask(payload: String): Boolean
  unassignUserTask(payload: String): Boolean
  forwardToUserUserTask(payload: String): Boolean
  forwardToQueueUserTask(payload: String): Boolean
  resolveUserTask(payload: String): Boolean
`;
