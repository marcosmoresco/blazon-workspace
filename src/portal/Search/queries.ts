import { gql } from "@apollo/client";

export const GET_SELF_SERVICE = gql`
  query getSelfService($q: String, $size: Int, $type: String) {
    getSelfService(q: $q, size: $size, type: $type) {
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
