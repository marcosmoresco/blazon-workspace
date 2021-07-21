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

export const GET_SELF_SERVICE_ADVANCED = gql`
  query getSelfServiceAdvanced(
    $q: String
    $size: Int
    $type: String
    $filters: String
  ) {
    getSelfServiceAdvanced(q: $q, size: $size, type: $type, filters: $filters) {
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

export const GET_SELF_SERVICE_FILTERS = gql`
  query getSelfServiceFilters($type: String) {
    getSelfServiceFilters(type: $type) {
      label
      name
      type
      values {
        label
        value
      }
    }
  }
`;

export const GET_DIRECTORY_RESOURCE = gql`
  query getDirectoryResource($id: Int) {
    getDirectoryResource(id: $id) {
      identifier
      name
      description
    }
  }
`;

export const GET_DIRECTORY_RESOURCE_ENTITLEMENTS = gql`
  query getDirectoryResourceEntitlements($id: Int, $page: Int, $size: Int, $ord: String) {
    getRepresentation: getDirectoryResourceEntitlements(id: $id, page: $page, size: $size, ord: $ord) {
      representation {
        identifier
        name
        description
      }      
      links {
        rel
        href
      }
    }
  }
`;

export const GET_DIRECTORY_ENTITLEMENT = gql`
  query getDirectoryEntitlement($id: Int) {
    getDirectoryEntitlement(id: $id) {
      identifier
      name
      description
      resource {
        name
      }
    }
  }
`;

export const GET_DIRECTORY_ROLE = gql`
  query getDirectoryRole($id: Int) {
    getDirectoryRole(id: $id) {
      identifier
      name
      description
    }
  }
`;

export const GET_DIRECTORY_ROLE_RIGHTS = gql`
  query getDirectoryRoleRights($id: Int, $page: Int, $size: Int, $ord: String) {
    getRepresentation: getDirectoryRoleRights(id: $id, page: $page, size: $size, ord: $ord) {
      representation {
        identifier
        resource {
          identifier
          name
          description
        }
        group {
          identifier
          name
          description
        }        
      }      
      links {
        rel
        href
      }
    }
  }
`;

export const GET_DIRECTORY_ROLE_RIGHT_ENTITLEMENTS = gql`
  query getDirectoryRoleRightEntitlements($id: Int, $rightId: Int, $page: Int, $size: Int, $ord: String) {
    getRepresentation: getDirectoryRoleRightEntitlements(id: $id, rightId: $rightId, page: $page, size: $size, ord: $ord) {
      representation {        
        identifier
        name
        description
      }            
      links {
        rel
        href
      }
    }
  }
`;
