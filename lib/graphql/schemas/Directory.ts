export const Directory = `
  type ResourceCategoryDirectory {
    identifier: Int
    name: String
    description: String    
  }

  type ResourceDirectory {
    identifier: Int
    name: String
    description: String
    type: String
    category: ResourceCategoryDirectory
    creationDate: String
    risk: String
    passwordVaultEnabled: Boolean
    syncPassword: Boolean
    visibleToSelfService: Boolean
    links: [Link]
  }

  type EntitlementDirectory {
    identifier: Int
    name: String
    description: String
    resource: ResourceDirectory    
    createdAt: Int
    risk: String   
    visibleToSelfService: Boolean
    links: [Link]
  }

  type RoleDirectory {
    identifier: Int
    name: String
    description: String  
    risk: String  
    totalResources: Int
    totalUsers: Int
    visibleToSelfService: Boolean
    links: [Link]
  }

  type RoleDirectoryRight {
    identifier: Int
    resource: ResourceDirectory
    group: RoleDirectory
    links: [Link]
  }

  type EntitlementDirectoryRepresentation {
    links: [Link]
    representation: [EntitlementDirectory]
  }

  type RoleDirectoryRightRepresentation {
    links: [Link]
    representation: [RoleDirectoryRight]
  }
`;