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
