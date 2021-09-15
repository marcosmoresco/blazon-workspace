import { gql } from "@apollo/client";

export const GET_REQUESTS = gql`
  query getRequests($page: Int, $size: Int, $ord: String, $filters: String) {
    getRequests(page: $page, size: $size, ord: $ord, filters: $filters) {
      requests {
        identifier
        requester {
          links {
            rel
            href
          }
          identifier
          displayName
        }
        beneficiary {
          links {
            rel
            href
          }
          identifier
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
        createdAt
        effectiveDate
        finalizedAt
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


export const GET_OPEN_REQUESTS = gql`
  query getOpenRequests {
    getOpenRequests {
      message
      amountOpen
    }
  }
`

export const GET_OPEN_STATUS = gql`
  query getOpenStatus {
    getOpenStatus
  }
`