import { SelfServiceMutations } from "./SelfService";
import { UserMutations } from "./User";
import { PasswordVaultMutations } from "./PasswordVault";
import { TaskMutations } from "./Task";
import { FormFieldsMutations } from "./FormFields";
import { TeamMutations } from "./Team";

export const Mutations = {
  ...SelfServiceMutations,
  ...UserMutations,
  ...PasswordVaultMutations,
  ...TaskMutations,
  ...FormFieldsMutations,
  ...TeamMutations,
};
