import { gql } from "@apollo/client";

export const GET_REQUESTS = gql`
  query getRequests($page: Int, $size: Int) {
    getRequests(page: $page, size: $size) {
      requests {
        identifier
        beneficiary {
          links {
            rel
            href
          }
          displayName
        }
        type
        effectiveDate
        status
        justification
      }
      links {
        rel
        href
      }
    }
  }
`;
