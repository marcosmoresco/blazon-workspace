import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: "same-origin",
});

const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;