export const SelfService = `  

  type SelfServiceAttribute {
    name: String
    value: String
  }

  type SelfServiceFilterValue {
    label: String
    value: String
  }

  type SelfServiceFilter {
    label: String
    name: String
    type: String
    values: [SelfServiceFilterValue]
  }

  type ReferenceTo {
    referenceToIdentifier: Int
    referenceToName: String
    referenceToType: String
  }

  type SelfService {
    name: String
    description: String
    type: String
    identifier: String
    referenceTo: ReferenceTo 
    attributes: [SelfServiceAttribute]   
  }

  type SelfServiceCartItemInstanceValidation { 
    status: Boolean
  }

  type SelfServiceCartItemInstance {    
    identifier: Int
    displayName: String
    userId: String
    accessAlreadyExistError: SelfServiceCartItemInstanceValidation
    adminAccountLockedError: SelfServiceCartItemInstanceValidation
    alreadyRequestInProgressError: SelfServiceCartItemInstanceValidation
    needExpirationDateError: SelfServiceCartItemInstanceValidation
    needSelectAccountError: SelfServiceCartItemInstanceValidation
    relatedAccountNotFoundError: SelfServiceCartItemInstanceValidation
    schemaValidatedError: SelfServiceCartItemInstanceValidation
    links: [Link]
  }

  type SelfServiceCartItem {
    identifier: Int
    assignType: String
    catalogItemId: String
    catalogItemType: String
    name: String
    description: String
    resourceType: String
    targetType: String
    targetId: String
    instances: [SelfServiceCartItemInstance]
  }

  type SelfServiceCart {    
    identifier: Int
    userId: String
    allowedAssignTypes: [String] 
    items: [SelfServiceCartItem]   
  }
`;

export const Queries = `
  getSelfServiceCart: SelfServiceCart 
  getSelfService(q: String, size: Int, type: String): [SelfService]  
  getSelfServiceAdvanced(q: String, size: Int, type: String, filters: String): [SelfService] 
  getSelfServiceFilters(type: String): [SelfServiceFilter]
  getSelfServiceItem(id: String): SelfService
`;

export const Mutations = `
  deleteSelfServiceCartItem(id: Int): Boolean
  addSelfServiceCartItem(id: String): Boolean
`;
