import { gql } from "@apollo/client";

export const SHARE_USER_SHARED_ACCOUNT = gql`
  mutation shareUserSharedAccount($accountId: Int, $userId: Int) {
    shareUserSharedAccount(accountId: $accountId, userId: $userId)
  }
`;

export const UNSHARE_USER_SHARED_ACCOUNT = gql`
  mutation unshareUserSharedAccount($accountId: Int, $userId: Int) {
    unshareUserSharedAccount(accountId: $accountId, userId: $userId)
  }
`;

export const REQUEST_CREDENTIALS_USER_APPLICATION_ACCOUNT = gql`
  mutation credentialsUserApplicationAccount(
    $accountId: Int
    $justification: String
    $effectiveDate: String
  ) {
    credentialsUserApplicationAccount(
      accountId: $accountId
      justification: $justification
      effectiveDate: $effectiveDate
    )
  }
`;

export const CHANGE_USER_THUMB = gql`
  mutation changeUserThumb($thumb: String) {
    changeUserThumb(thumb: $thumb)
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation changePassword(
    $currentPassword: String
    $newPassword: String
    $newPasswordConfirm: String
  ) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
      newPasswordConfirm: $newPasswordConfirm
    )
  }
`;

export const CHECKOUT_ADMIN_ACCOUNT = gql`
  mutation checkoutAdminAccount($payload: String) {
    checkoutAdminAccount(payload: $payload)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($payload: String) {
    updateUser(payload: $payload)
  }
`;
