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

  type SelfServiceRepresentation {
    representation: [SelfService]   
    links: [Link]
  }

  type SelfServiceCartItemInstanceValidation { 
    status: Boolean
    relatedCatalogItemName: String
    relatedCatalogItemId: String
  }

  type SelfServiceCartItemInstance {    
    identifier: Int
    displayName: String
    userId: String
    payload: String
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

  type SelfServiceCartSubmit {    
    requestId: Int     
  }
`;

export const Queries = `
  getSelfServiceCart: SelfServiceCart 
  getSelfService(q: String, size: Int, type: String): [SelfService]  
  getSelfServiceAdvanced(q: String, size: Int, page: Int, ord: String, fullTextAttrib: String, type: String, filters: String): SelfServiceRepresentation 
  getProcessedSearch(size: Int, page: Int, filters: String): SelfServiceRepresentation
  getSelfServiceFilters(type: String): [SelfServiceFilter]
  getSelfServiceItem(id: String): SelfService
`;

export const Mutations = `
  submitSelfServiceCart(effectiveDate: String, justification: String): SelfServiceCartSubmit
  deleteSelfServiceCart: Boolean
  deleteSelfServiceCartItem(identifier: Int, name: String, catalogItemType: String, resourceType: String): SelfServiceCartItem
  updateSelfServiceCartItem(identifier: Int, assignType: String): Boolean
  addSelfServiceCartItem(id: String, assignType: String, userId: String): SelfServiceCartItem
  updateSelfServiceCartItemInstance(itemId: Int, identifier: Int, payload: String, expireAt: String, accountId: Int): Boolean
  addSelfServiceCartItemInstance(itemId: Int, userId: Int): Boolean
  deleteSelfServiceCartItemInstance(itemId: Int, userId: Int): Boolean
`;
