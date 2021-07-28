import { gql } from "@apollo/client";

export const GET_SELF_SERVICE_CART = gql`
  {
    getSelfServiceCart {
      allowedAssignTypes
      identifier
      userId
      items {
        identifier
        assignType
        catalogItemId
        catalogItemType
        name
        description
        resourceType
        targetType
        targetId
        instances {
          identifier
          displayName
          userId
          payload
          accessAlreadyExistError {
            status
          }
          adminAccountLockedError {
            status
          }
          alreadyRequestInProgressError {
            status
          }
          needExpirationDateError {
            status
          }
          needSelectAccountError {
            status
          }
          relatedAccountNotFoundError {
            status
            relatedCatalogItemName
            relatedCatalogItemId
          }
          schemaValidatedError {
            status
          }
          links {
            href
            rel
          }
        }
      }
    }
  }
`;