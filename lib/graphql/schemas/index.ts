import { gql } from "apollo-server-express";
import { Link } from "./Link";
import { User, Queries as UserQueries, Mutations as UserMutations } from "./User";
import { Resume, Queries as ResumeQueries } from "./Resume";
import { Permission } from "./Permission";
import {
  PasswordVault,
  Queries as PasswordVaultQueries,
} from "./PasswordVault";
import { ApprovalDetails } from "./ApprovalDetails";
import { Request, Queries as RequestQueries } from "./Request";
import {
  SelfService,
  Queries as SelfServiceQueries,
  Mutations as SelfServiceMutations,
} from "./SelfService";
import { Directory, Queries as DirectoryQueries } from "./Directory";
import { Queries as FormDatasQueries } from "./FormDatas";

export const typeDefs = gql`
  ${Link}
  ${User}
  ${Resume}
  ${Permission}
  ${PasswordVault}
  ${ApprovalDetails}
  ${Request}
  ${SelfService}
  ${Directory}

  type Query {
    ${ResumeQueries}      
    ${UserQueries}
    ${PasswordVaultQueries}
    ${RequestQueries}
    ${DirectoryQueries}
    ${SelfServiceQueries}
    ${FormDatasQueries}
  }

  type Mutation {
    ${SelfServiceMutations}
    ${UserMutations}
  }
`;
