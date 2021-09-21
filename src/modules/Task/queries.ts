import { gql } from "@apollo/client";

export const GET_REQUEST_APPROVAL_TASK_FILTERS = gql`
  query getRequestApprovalTaskFilters($type: String, $statusList: String) {
    getFilters: getRequestApprovalTaskFilters(type: $type, statusList: $statusList) {
      orderable
      value
      label
      clauses {
        label
        type
        value
        fields
      }
    }
  }
`;

export const GET_CERTIFICATION_APPROVAL_TASK_FILTERS = gql`
  query getCertificationApprovalTaskFilters($type: String, $statusList: String) {
    getFilters: getCertificationApprovalTaskFilters(type: $type, statusList: $statusList) {
      orderable
      value
      label
      clauses {
        label
        type
        value
        fields
      }
    }
  }
`;

export const GET_SOD_APPROVAL_TASK_FILTERS = gql`
  query getSoDApprovalTaskFilters($type: String, $statusList: String) {
    getFilters: getSoDApprovalTaskFilters(type: $type, statusList: $statusList) {
      orderable
      value
      label
      clauses {
        label
        type
        value
        fields
      }
    }
  }
`;

export const GET_ROLE_RIGHT_APPROVAL_TASK_FILTERS = gql`
  query getRoleRightApprovalTaskFilters($type: String, $statusList: String) {
    getFilters: getRoleRightApprovalTaskFilters(type: $type, statusList: $statusList) {
      orderable
      value
      label
      clauses {
        label
        type
        value
        fields
      }
    }
  }
`;

export const GET_PROVISIONING_TASK_FILTERS = gql`
  query getProvisioningTaskFilters($type: String, $statusList: String) {
    getFilters: getProvisioningTaskFilters(type: $type, statusList: $statusList) {
      orderable
      value
      label
      clauses {
        label
        type
        value
        fields
      }
    }
  }
`;

export const GET_ASSIGN_ACTIONS = gql`
  query getAssignActions($status: String) {
    getAssignActions(status: $status)
  }
`;

export const GET_TASKS = gql`
  query getTasks($page: Int, $size: Int, $ord: String, $filters: String) {
    getTasks(page: $page, size: $size, ord: $ord, filters: $filters) {   
      representation {
        identifier
        type
        justification
        disapprovalJustification
        dates {
          createdDate
          resolvedDate
          deadline
        }
        headers {
          category
          createdBy
          createdByObjectId
          priority
          status
          result
          from {
            identifier
            displayName
            links {
              rel
              href
            }
          }
          recipient {
            identifier
            displayName
            links {
              rel
              href
            }
          }
        }
        approvalItemDetails {
          resourceRisk
          resourceName
          resourceIdentifier
          resourceDescription
          roleName
          roleIdentifier
          roleDescription
          entitlementName
          entitlementIdentifier
          entitlementDescription
          account {
            accountIdentifier
          }
        }
        certificationItemDetails {
          resourceRisk
          resourceName
          resourceIdentifier
          resourceDescription
          roleName
          roleIdentifier
          roleDescription
          entitlementName
          entitlementIdentifier
          entitlementDescription
        }
        itemDetails {    
          roleName
          roleDescription
        }
        provisioningItemDetail {
          account {
            accountIdentifier
            identifier
          }
          resource {
            name
            description
            identifier
          }
        }
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_REQUEST_APPROVAL_TASKS_AVAILABLE_ACTIONS = gql`
  query getRequestApprovalTasksAvailableActions($status: String) {
    getActions: getRequestApprovalTasksAvailableActions(status: $status)
  }
`;

export const GET_REQUEST_APPROVAL_TASKS = gql`
  query getRequestApprovalTasks($page: Int, $size: Int, $ord: String, $filters: String) {
    getRequestApprovalTasks(page: $page, size: $size, ord: $ord, filters: $filters) {   
      representation {
        identifier
        type
        justification
        disapprovalJustification
        dates {
          createdDate
          resolvedDate
          deadline
        }
        headers {
          category
          createdBy
          createdByObjectId
          priority
          status
          result
          from {
            identifier
            displayName
            links {
              rel
              href
            }
          }
          recipient {
            identifier
            displayName
            links {
              rel
              href
            }
          }
        }
        approvalItemDetails {
          resourceRisk
          resourceName
          resourceIdentifier
          resourceDescription
          roleName
          roleIdentifier
          roleDescription
          entitlementName
          entitlementIdentifier
          entitlementDescription
        }
        itemDetails {    
          roleName
          roleDescription
        }
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_REQUEST_APPROVAL_TASK = gql`
  query getRequestApprovalTask($id: Int) {
    getRequestApprovalTask(id: $id) {     
      identifier
      justification
      disapprovalJustification
      type
      dates {
        createdDate
        resolvedDate
        deadline
      }
      headers {
        category
        createdBy
        createdByObjectId
        priority
        status
        result
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        recipient {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }
      approvalItemDetails {
        resourceRisk
        resourceName
        resourceIdentifier
        resourceDescription
        roleName
        roleIdentifier
        roleDescription
        entitlementName
        entitlementIdentifier
        entitlementDescription
        account {
          accountIdentifier
        }
      }
      itemDetails {    
        roleName
        roleDescription
      }
      comments {
        comment
        date   
        identifier
        user {
          displayName
          links {
            rel
            href
          }
        }
      }
      assignHistory {
        date
        to {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }
      links {
        rel
        href
      }      
    }
  }
`;

export const GET_CERTIFICATION_APPROVAL_TASKS_AVAILABLE_ACTIONS = gql`
  query getCertificationApprovalTasksAvailableActions($status: String) {
    getActions: getCertificationApprovalTasksAvailableActions(status: $status)
  }
`;

export const GET_CERTIFICATION_APPROVAL_TASKS = gql`
  query getCertificationApprovalTasks($page: Int, $size: Int, $ord: String, $filters: String) {
    getCertificationApprovalTasks(page: $page, size: $size, ord: $ord, filters: $filters) {   
      representation {
        identifier
        type
        justification
        dates {
          createdDate
          resolvedDate
          deadline
        }
        headers {
          category
          createdBy
          createdByObjectId
          priority
          status
          result
          from {
            identifier
            displayName
            links {
              rel
              href
            }
          }
          recipient {
            identifier
            displayName
            links {
              rel
              href
            }
          }
        }
        certificationItemDetails {
          resourceRisk
          resourceName
          resourceIdentifier
          resourceDescription
          roleName
          roleIdentifier
          roleDescription
          entitlementName
          entitlementIdentifier
          entitlementDescription
        }
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_CERTIFICATION_APPROVAL_TASK = gql`
  query getCertificationApprovalTask($id: Int) {
    getCertificationApprovalTask(id: $id) {     
      identifier
      justification
      revokeJustification
      type
      dates {
        createdDate
        resolvedDate
        deadline
      }
      headers {
        category
        createdBy
        createdByObjectId
        priority
        status
        result
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        recipient {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }
      certificationItemDetails {
        resourceRisk
        resourceName
        resourceIdentifier
        resourceDescription
        roleName
        roleIdentifier
        roleDescription
        entitlementName
        entitlementIdentifier
        entitlementDescription
      }
      comments {
        comment
        date   
        identifier
        user {
          displayName
          links {
            rel
            href
          }
        }
      }
      assignHistory {
        date
        to {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }
      links {
        rel
        href
      }      
    }
  }
`;

export const GET_SOD_APPROVAL_TASKS_AVAILABLE_ACTIONS = gql`
  query getSoDApprovalTasksAvailableActions($status: String) {
    getActions: getSoDApprovalTasksAvailableActions(status: $status)
  }
`;

export const GET_SOD_APPROVAL_TASKS = gql`
  query getSoDApprovalTasks($page: Int, $size: Int, $ord: String, $filters: String) {
    getSoDApprovalTasks(page: $page, size: $size, ord: $ord, filters: $filters) {   
      representation {
        identifier
        type
        justification
        dates {
          createdDate
          resolvedDate
          deadline
        }
        headers {
          category
          createdBy
          createdByObjectId
          priority
          status
          result
          from {
            identifier
            displayName
            links {
              rel
              href
            }
          }
          recipient {
            identifier
            displayName
            links {
              rel
              href
            }
          }
        }
        approvalItemDetails {
          resourceRisk
          resourceName
          resourceIdentifier
          resourceDescription
          roleName
          roleIdentifier
          roleDescription
          entitlementName
          entitlementIdentifier
          entitlementDescription
        }
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_SOD_APPROVAL_TASK = gql`
  query getSoDApprovalTask($id: Int) {
    getSoDApprovalTask(id: $id) {     
      identifier
      justification
      type
      dates {
        createdDate
        resolvedDate
        deadline
      }
      headers {
        category
        createdBy
        createdByObjectId
        priority
        status
        result
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        recipient {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }
      approvalItemDetails {
        resourceRisk
        resourceName
        resourceIdentifier
        resourceDescription
        roleName
        roleIdentifier
        roleDescription
        entitlementName
        entitlementIdentifier
        entitlementDescription
      }
      comments {
        comment
        date   
        identifier
        user {
          displayName
          links {
            rel
            href
          }
        }
      }
      assignHistory {
        date
        to {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }
      links {
        rel
        href
      }      
    }
  }
`;

export const GET_ROLE_RIGHT_APPROVAL_TASKS_AVAILABLE_ACTIONS = gql`
  query getRoleRightApprovalTasksAvailableActions($status: String) {
    getActions: getRoleRightApprovalTasksAvailableActions(status: $status)
  }
`;

export const GET_ROLE_RIGHT_APPROVAL_TASKS = gql`
  query getRoleRightApprovalTasks($page: Int, $size: Int, $ord: String, $filters: String) {
    getRoleRightApprovalTasks(page: $page, size: $size, ord: $ord, filters: $filters) {   
      representation {
        identifier
        type
        justification
        dates {
          createdDate
          resolvedDate
          deadline
        }
        headers {
          category
          createdBy
          createdByObjectId
          priority
          status
          from {
            identifier
            displayName
            links {
              rel
              href
            }
          }
          recipient {
            identifier
            displayName
            links {
              rel
              href
            }
          }
        }
        itemDetails {         
          roleName          
          roleDescription
          justification
        }
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_ROLE_RIGHT_APPROVAL_TASK = gql`
  query getRoleRightApprovalTask($id: Int) {
    getRoleRightApprovalTask(id: $id) {     
      identifier
      justification
      type
      dates {
        createdDate
        resolvedDate
        deadline
      }
      headers {
        category
        createdBy
        createdByObjectId
        priority
        status
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        recipient {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }
      itemDetails {  
        justification     
        roleName       
        roleDescription
      }
      comments {
        comment
        date   
        identifier
        user {
          displayName
          links {
            rel
            href
          }
        }
      }
      assignHistory {
        date
        to {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }
      links {
        rel
        href
      }      
    }
  }
`;

export const GET_ROLE_RIGHT_APPROVAL_TASK_ITEMS = gql`
  query getRoleRightApprovalTaskItems($id: Int) {
    getRoleRightApprovalTaskItems(id: $id) {  
      action   
      identifier      
      items {
        identifier
        approvalStatus
        entryDescription
        entryId
        entryName
        entryType
      }      
    }
  }
`;

export const GET_PROVISIONING_TASKS_AVAILABLE_ACTIONS = gql`
  query getProvisioningTasksAvailableActions($status: String) {
    getActions: getProvisioningTasksAvailableActions(status: $status)
  }
`;

export const GET_PROVISIONING_TASKS = gql`
  query getProvisioningTasks($page: Int, $size: Int, $ord: String, $filters: String) {
    getProvisioningTasks(page: $page, size: $size, ord: $ord, filters: $filters) {   
      representation {
        identifier
        type
        justification
        disapprovalJustification
        dates {
          createdDate
          resolvedDate
          deadline
        }
        headers {
          category
          createdBy
          createdByObjectId
          priority
          status
          result
          from {
            identifier
            displayName
            links {
              rel
              href
            }
          }
          recipient {
            identifier
            displayName
            links {
              rel
              href
            }
          }
        }
        provisioningItemDetail {
          account {
            accountIdentifier
            identifier
          }
          resource {
            name
            description
            identifier
          }
          entitlement {
            name
            description
          }
        }
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_PROVISIONING_TASK = gql`
  query getProvisioningTask($id: Int) {
    getProvisioningTask(id: $id) {      
      identifier
      justification
      disapprovalJustification
      type
      entrySchema
      dates {
        createdDate
        resolvedDate
        deadline
      }
      headers {
        category
        createdBy
        createdByObjectId
        priority
        status
        result
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        recipient {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }  
      provisioningItemDetail {
        account {
          accountIdentifier
          identifier
        }
        resource {
          name
          description
          identifier
        }
        entitlement {
          name
          description
        }
      }
      comments {
        comment
        date   
        identifier
        user {
          displayName
          links {
            rel
            href
          }
        }
      }  
      assignHistory {
        date
        to {
          identifier
          displayName
          links {
            rel
            href
          }
        }
        from {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }  
      links {
        rel
        href
      }
    }
  }
`;

export const GET_TASK_QUEUES = gql`
  query getTaskQueues {
    getTaskQueues {
      links {
        rel
        href
      }
      representation {
        identifier
        name
        description
        amountTasks
        links {
          rel
          href
        }
      }
    }
  }
`;

export const GET_TASK_QUEUE_TASKS = gql`
  query getTaskQueueTasks($id: Int, $page: Int, $size: Int, $ord: String, $filters: String) {
    getTaskQueueTasks(id: $id, page: $page, size: $size, ord: $ord, filters: $filters) {   
      representation {
        identifier
        type
        justification
        dates {
          createdDate
          resolvedDate
          deadline
        }
        headers {
          category
          createdBy
          createdByObjectId
          priority
          status
          from {
            identifier
            displayName
            links {
              rel
              href
            }
          }
          recipient {
            identifier
            displayName
            links {
              rel
              href
            }
          }
        }
        approvalItemDetails {
          resourceRisk
          resourceName
          resourceIdentifier
          resourceDescription
          roleName
          roleIdentifier
          roleDescription
          entitlementName
          entitlementIdentifier
          entitlementDescription
          account {
            accountIdentifier
          }
        }
        certificationItemDetails {
          resourceRisk
          resourceName
          resourceIdentifier
          resourceDescription
          roleName
          roleIdentifier
          roleDescription
          entitlementName
          entitlementIdentifier
          entitlementDescription
        }
        itemDetails {    
          roleName
          roleDescription
        }
        provisioningItemDetail {
          account {
            accountIdentifier
            identifier
          }
          resource {
            name
            description
            identifier
          }
        }
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_TASK_QUEUES_FILTERS = gql`
  query getTaskQueuesFilters($category: String, $type: String) {
    getFilters: getTaskQueuesFilters(category: $category, type: $type) {
      label
      orderable
      value
      clauses {
        label
        type
        value
        fields
      }
    }
  }
`;

export const RESUME = gql`
  query getResume($listStatus: String) {
    getResume(listStatus: $listStatus) {
      openApprovalTasks
      openCertificationTasks
      openProvisioningTasks
      openRoleRightsTasks
      openSodTasks
      openUserRevalidationTasks
      totalOpenTasks
    }    
  }
`;

export const GET_DIRECTORY_RESOURCE = gql`
  query getDirectoryResource($id: Int) {
    getDirectoryResource(id: $id) {
      identifier
      name
      description
      passwordVaultEnabled
    }
  }
`;