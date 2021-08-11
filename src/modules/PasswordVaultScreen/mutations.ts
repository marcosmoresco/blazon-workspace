import { gql } from "@apollo/client";

export const SAVE_PASSWORD_VAULT = gql`
  mutation savePasswordVault(
    $name: String
    $description: String
    $username: String
    $password: String
  ) {
    savePasswordVault(
      name: $name
      description: $description
      username: $username
      password: $password
    ) {
      identifier
    }
  }
`;

export const REVOKE_PASSWORD_VAULT_ENTRY = gql`
  mutation revokePasswordVaultEntry(
    $id: Int
    $permission: String
    $userId: Int
  ) {
    revokePasswordVaultEntry(id: $id, permission: $permission, userId: $userId)
  }
`;

export const GRANT_PASSWORD_VAULT_ENTRY = gql`
  mutation grantPasswordVaultEntry(
    $id: Int
    $permission: String
    $userId: Int
  ) {
    grantPasswordVaultEntry(id: $id, permission: $permission, userId: $userId)
  }
`;

export const DELETE_PASSWORD_VAULT_ENTRY = gql`
  mutation deletePasswordVaultEntry($id: Int) {
    deletePasswordVaultEntry(id: $id)
  }
`;

export const SHARE_PASSWORD_VAULT_ENTRY = gql`
  mutation sharePasswordVaultEntry($id: Int, $payload: String) {
    sharePasswordVaultEntry(id: $id, payload: $payload)
  }
`;