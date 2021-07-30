import { gql } from "@apollo/client";

export const GET_ENTRIES = gql`
  {
    getPasswordVaultEntries {
      identifier
      name
      description
      username
      password
      permissions {
        modify
        read
        share
        user {
          identifier
          displayName
          links {
            rel
            href
          }
        }
      }
    }
  }
`;

export const GET_PASSWORD_VAULT_ENTRY = gql`
  query getPasswordVaultEntry($id: Int) {
    getPasswordVaultEntry(id: $id) {
      identifier
      name
      description
      username
      password
    }
  }
`;
