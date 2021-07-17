import { gql } from "@apollo/client";

export const GET_SELF_SERVICE = gql`
  query getSelfService($q: String, $type: String) {
    getSelfService(q: $q, type: $type) {
      name
      description
      type
      identifier
      referenceTo {
        referenceToIdentifier
        referenceToName
        referenceToType
      }    
    }
  }
`;
