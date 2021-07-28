import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query getNotifications($page: Int, $size: Int, $ord: String) {
    getNotifications(page: $page, size: $size, ord: $ord) {
      nroNotRead
      total        
      notifications {
        identifier
        from {
          displayName
          links {
            rel
            href
          }
        }
        to {
          displayName
          links {
            rel
            href
          }
        }
        date
        subject
        content
        status
        links {
          rel
          href
        }
      }
      links {
        rel
        href
      }
    }
  }
`;
