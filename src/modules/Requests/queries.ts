import { gql } from "@apollo/client";

export const GET_REQUESTS = gql`
  query getRequests($page: Int, $size: Int, $ord: String, $filters: String) {
    getRequests(page: $page, size: $size, ord: $ord, filters: $filters) {
      requests {
        identifier
        beneficiary {
          links {
            rel
            href
          }
          displayName
        }
        user {
          firstName
          middleName
          lastName
          email
          personalEmail
          displayName
          phone
          mobilePhone
          username
        }
        account {
          accountIdentifier
        }
        resource {
          name
          description
        }
        role {
          name
          description
        }
        entitlement {
          name
          description
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
