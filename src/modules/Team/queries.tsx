import { gql } from "@apollo/client";

export const GET_TEAM = gql`
  query getResponsibleTeam {
    getResponsibleTeam {
      representation {
        identifier
        user {
          identifier
          username
          displayName
          links {
            rel
            href
          }
        }
      }      
    }
  }
`;

export const GET_TEAM_USER_DATA = gql`
  query getResponsibleTeamUserData($id: Int)  {
    getResponsibleTeamUserData(id: $id) {
      fields {
        name
        label
        value
        editable
        required
        type
      }   
      links {
        rel
        href
      }       
    }
  }
`;