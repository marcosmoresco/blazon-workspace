import { SelfServiceMutations } from "./SelfService";
import { UserMutations } from "./User";
import { PasswordVaultMutations } from "./PasswordVault";
import { TaskMutations } from "./Task";

export const Mutations = {
  ...SelfServiceMutations,
  ...UserMutations,
  ...PasswordVaultMutations,
  ...TaskMutations,
};
