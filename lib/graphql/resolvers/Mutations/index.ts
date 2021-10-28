import { SelfServiceMutations } from "./SelfService";
import { UserMutations } from "./User";
import { PasswordVaultMutations } from "./PasswordVault";
import { TaskMutations } from "./Task";
import { FormFieldsMutations } from "./FormFields";

export const Mutations = {
  ...SelfServiceMutations,
  ...UserMutations,
  ...PasswordVaultMutations,
  ...TaskMutations,
  ...FormFieldsMutations
};
