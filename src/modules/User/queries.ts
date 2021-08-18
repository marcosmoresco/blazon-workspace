import { gql } from "@apollo/client";

export const GET_USER_FULL_TEXT = gql`
  query getUserFullText($size: Int, $q: String) {
    getUserFullText(size: $size, q: $q) {
      links {
        rel
        href
      }
      displayName
      identifier
    }
  }
`;

export const GET_FORM_DATAS = gql`
  query getModifyEntry($entryId: Int, $schema: String) {
    getModifyEntry(entryId: $entryId, schema: $schema)
  }
`;

export const GET_USER_ROLES = gql`
  query getUserRoles($page: Int, $size: Int, $ord: String, $filters: String) {
    getRepresentation: getUserRoles(
      page: $page
      size: $size
      ord: $ord
      filters: $filters
    ) {
      roles {
        identifier
        name
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_USER_ENTITLEMENTS = gql`
  query getUserEntitlements(
    $page: Int
    $size: Int
    $ord: String
    $filters: String
  ) {
    getRepresentation: getUserEntitlements(
      page: $page
      size: $size
      ord: $ord
      filters: $filters
    ) {
      representation {
        identifier
        name
        resource {
          name
        }
        account {
          accountIdentifier
        }
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_USER_ACCOUNTS = gql`
  query getUserAccounts(
    $page: Int
    $size: Int
    $ord: String
    $filters: String
  ) {
    getUserAccounts(page: $page, size: $size, ord: $ord, filters: $filters) {
      accounts {
        identifier
        accountIdentifier
        name
        resourceName
        status
        createdAt
      }
      links {
        rel
        href
      }
    }
  }
`;

export const GET_USER_SHARED_ACCOUNT_MEMBERS = gql`
  query getUserSharedAccountMembers($id: String) {
    getUserSharedAccountMembers(id: $id) {
      displayName
      identifier
      links {
        rel
        href
      }
    }
  }
`;
