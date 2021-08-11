import { from, HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from 'graphql';
import router from 'next/router';

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: "same-origin",
});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if(message === "Request failed with status code 401" && extensions?.exception?.config?.headers?.Authorization !== "Bearer undefined") {        
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        router.push("/login");
        return false;
      }  
    });        
});

const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;