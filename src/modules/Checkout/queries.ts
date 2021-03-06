import { gql } from "@apollo/client";

export const GET_FORM_DATAS = gql`
  query getNewEntry($resourceId: Int, $schema: String) {
    getNewEntry(resourceId: $resourceId, schema: $schema)
  }
`;

export const GET_APPLICATION_ACCOUNTS_BY_ENTITLEMENT = gql`
  query getApplicationAccountsByEntitlement($payload: String) {
    getApplicationAccountsByEntitlement(payload: $payload) {
      identifier
      accountIdentifier      
    }
  }
`;

export const FORM_RENDER = gql`
  query formFieldRender($formId: Int) {
    formFieldRender(formId: $formId)
  }
`;

export const GENERATE_USERNAMES = gql`
  query generateUsernames($formId: Int, $amountSuggestions: Int, $usernamePolicyId: Int, $payload: String) {
    generateUsernames(formId: $formId, amountSuggestions: $amountSuggestions, usernamePolicyId: $usernamePolicyId, payload: $payload)
  }
`;