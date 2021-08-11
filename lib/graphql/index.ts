import http from "http";
import app from "../app";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { info } from "../log";

const { ApolloServer } = require("apollo-server-express");

const graphql = async function () {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req } : {req : any}) => ({ req }),    
  });

  await server.start();

  const path = "/api/graphql";
  server.applyMiddleware({ app, path });

  const httpServer = http.createServer(app);

  const port = process.env.PORT || 3000;

  info(`
  #########################################################
  ##################### ❇ Blazon ❇ #######################
  #########################################################\n`);
  httpServer.listen(port, () => {
    info(`> Server ready on http://localhost:${port}`);
    info(
      `🚀 Server graphql ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
  return { server, app };
};

export default graphql;
