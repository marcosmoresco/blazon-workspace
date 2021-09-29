import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import router from 'next/router';

const uri = process.env.NEXT_PUBLIC_GRAPHQL_SERVER;

const httpLink = new HttpLink({
  uri,
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