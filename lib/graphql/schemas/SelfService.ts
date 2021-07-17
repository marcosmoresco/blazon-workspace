export const SelfService = `  

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
  }
`;
