import { SelfServiceMutations } from "./SelfService";
import { UserMutations } from "./User";

export const Mutations = {
  ...SelfServiceMutations,
  ...UserMutations,
};
