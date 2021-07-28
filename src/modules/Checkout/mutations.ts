import { gql } from "@apollo/client";

export const UPDATE_SELF_SERVICE_CART_ITEM_INSTANCE = gql`
  mutation updateSelfServiceCartItemInstance(
    $itemId: Int
    $identifier: Int
    $payload: String
  ) {
    updateSelfServiceCartItemInstance(
      itemId: $itemId
      identifier: $identifier
      payload: $payload
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
