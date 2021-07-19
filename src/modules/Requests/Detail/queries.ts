import { gql } from "@apollo/client";

export const GET_REQUEST = gql`
  query getRequest($id: Int) {
    getRequest(id: $id) {
      identifier
      approvalDetails {
        identifier
        creation
        approvalDate
        outcome
        taskId
        approver {
          links {
            rel
            href
          }
          displayName
        }
      }
      sodDetails {
        identifier
        creation
        approvalDate
        outcome        
        approver {
          links {
            rel
            href
          }
          displayName
        }
      }
      requester {
        links {
          rel
          href
        }
        displayName
      }
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
      account {
        accountIdentifier
      }
      type
      effectiveDate
      createdAt
      finalizedAt
      status
      justification      
      links {
        rel
        href
      }
    }    
  }  
`;

export const GET_CANCEL_REQUEST = gql`
  query getCancelRequest($id: Int) {
    getCancelRequest(id: $id)
  }
`;

export const GET_REQUEST_TRANSITION_STATES = gql`
  query getRequestTransitionStates($id: Int) {
    getRequestTransitionStates(id: $id) {
      sourceState
      targetState
      description
      detail
      date        
    }
  }
`;
