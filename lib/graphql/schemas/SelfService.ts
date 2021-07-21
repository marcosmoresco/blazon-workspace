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
`;
