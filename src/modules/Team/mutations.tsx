import { gql } from "@apollo/client";

export const RESPONSIBLE_TEAM_GENERATE_REQUESTS = gql`
  mutation responsibleTeamGenerateRequests($payload: String) {
   result: responsibleTeamGenerateRequests(payload: $payload)
  }
`;