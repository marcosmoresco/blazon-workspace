import { gql } from '@apollo/client';

export const GET_ENTRIES = gql`{
  getPasswordVaultEntries {
  	identifier
   	name
    description
    username
    password
  }
}`
;