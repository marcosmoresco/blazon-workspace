import { gql } from "@apollo/client";

export const ADD_SELF_SERVICE_CART_ITEM = gql`
  mutation AddSelfServiceCartItem(
    $id: String
    $assignType: String
    $userId: String
  ) {
    addSelfServiceCartItem(id: $id, assignType: $assignType, userId: $userId) {
      identifier
      name
      targetType
      catalogItemId
    }
  }
`;

export const DELETE_SELF_SERVICE_CART_ITEM = gql`
  mutation DeleteSelfServiceCartItem(
    $identifier: Int
    $name: String
    $targetType: String
  ) {
    deleteSelfServiceCartItem(
      identifier: $identifier
      name: $name
      targetType: $targetType
    ) {
      identifier
      name
      targetType
    }
  }
`;

export const DELETE_SELF_SERVICE_CART = gql`
  mutation deleteSelfServiceCart {
    deleteSelfServiceCart
  }
`;

export const SUBMIT_SELF_SERVICE_CART = gql`
  mutation submitSelfServiceCart(
    $effectiveDate: String
    $justification: String
  ) {
    submitSelfServiceCart(
      effectiveDate: $effectiveDate
      justification: $justification
    ) {
      requestId
    }
  }
`;
