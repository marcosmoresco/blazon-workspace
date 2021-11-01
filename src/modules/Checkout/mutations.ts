import { gql } from "@apollo/client";

export const UPDATE_SELF_SERVICE_CART_ITEM_INSTANCE = gql`
  mutation updateSelfServiceCartItemInstance(
    $itemId: Int
    $identifier: Int
    $payload: String
    $expireAt: String
    $accountId: Int
  ) {
    updateSelfServiceCartItemInstance(
      itemId: $itemId
      identifier: $identifier
      payload: $payload
      expireAt: $expireAt
      accountId: $accountId
    )
  }
`;

export const ADD_SELF_SERVICE_CART_ITEM_INSTANCE = gql`
  mutation addSelfServiceCartItemInstance($itemId: Int, $userId: Int) {
    addSelfServiceCartItemInstance(itemId: $itemId, userId: $userId)
  }
`;

export const DELETE_SELF_SERVICE_CART_ITEM_INSTANCE = gql`
  mutation deleteSelfServiceCartItemInstance($itemId: Int, $userId: Int) {
    deleteSelfServiceCartItemInstance(itemId: $itemId, userId: $userId)
  }
`;

export const UPDATE_SELF_SERVICE_CART_ITEM = gql`
  mutation updateSelfServiceCartItem($identifier: Int, $assignType: String) {
    updateSelfServiceCartItem(identifier: $identifier, assignType: $assignType)
  }
`;

export const VALIDATE_FORM_FIELD = gql`
  mutation validateFormField($fieldId: Int, $payload: String) {
    validateFormField(fieldId: $fieldId, payload: $payload)
  }
`;

export const VALIDATE_FORM = gql`
  mutation validateForm($formId: Int, $payload: String) {
    validateForm(formId: $formId, payload: $payload)
  }
`;
