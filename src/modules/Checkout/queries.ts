import { gql } from "@apollo/client";

export const GET_FORM_DATAS = gql`
  query getNewEntry($resourceId: Int, $schema: String) {
    getNewEntry(resourceId: $resourceId, schema: $schema)
  }
`;
