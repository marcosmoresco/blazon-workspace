import { SelfServiceMutations } from "./SelfService";
import { UserMutations } from "./User";
import { PasswordVaultMutations } from "./PasswordVault";

export const Mutations = {
  ...SelfServiceMutations,
  ...UserMutations,
  ...PasswordVaultMutations,
};
