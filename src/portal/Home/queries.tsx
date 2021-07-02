import { gql } from '@apollo/client';

export const RESUME = gql`{
  getResume {
    totalOpenTasks
  }
}`
;