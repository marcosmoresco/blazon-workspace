import { gql } from "@apollo/client";

export const ADD_SELF_SERVICE_CART_ITEM = gql`
  mutation AddSelfServiceCartItem($id: String) {
    addSelfServiceCartItem(id: $id)
  }
`;

export const DELETE_SELF_SERVICE_CART_ITEM = gql`
  mutation DeleteSelfServiceCartItem($id: Int) {
    deleteSelfServiceCartItem(id: $id)
  }
`;
