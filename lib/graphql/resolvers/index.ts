import { Queries } from "./Queries";
import { Mutations } from "./Mutations";

export const resolvers = {
  Query: {
    ...Queries,
  },
  Mutation: {
    ...Mutations,
  },
};
