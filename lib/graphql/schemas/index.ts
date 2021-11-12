import { gql } from "apollo-server-express";
import { Link } from "./Link";
import {
  User,
  Queries as UserQueries,
  Mutations as UserMutations,
} from "./User";
import { Resume, Queries as ResumeQueries } from "./Resume";
import { Permission } from "./Permission";
import {
  PasswordVault,
  Queries as PasswordVaultQueries,
  Mutations as PasswordVaultMutations,
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
import { Notification, Queries as NotificatonQueries } from "./Notification";
import {
  Task,
  Queries as TaskQueries,
  Mutations as TaskMutations,
} from "./Task";
import {
  TaskQueue,
  Queries as TaskQueueQueries,  
} from "./TaskQueue";
import {
  Queries as FormFieldsQueries,
  Mutations as FormFieldsMutations,
} from "./FormFields";
import {
  Queries as ItemsQueries, 
} from "./Items";
import {
  Team,
  Queries as TeamQueries, 
  Mutations as TeamMutations,
} from "./Team";

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
  ${Notification}
  ${Task}
  ${TaskQueue}
  ${Team}
  
  type Query {
    ${ResumeQueries}      
    ${UserQueries}
    ${PasswordVaultQueries}
    ${RequestQueries}
    ${DirectoryQueries}
    ${SelfServiceQueries}
    ${FormDatasQueries}
    ${NotificatonQueries}
    ${TaskQueries}
    ${TaskQueueQueries}
    ${FormFieldsQueries}
    ${ItemsQueries}
    ${TeamQueries}
  }

  type Mutation {
    ${SelfServiceMutations}
    ${UserMutations}
    ${PasswordVaultMutations}
    ${TaskMutations}
    ${FormFieldsMutations}
    ${TeamMutations}
  }
`;
