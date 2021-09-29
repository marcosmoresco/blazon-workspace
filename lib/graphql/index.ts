import http from "http";
import https from "https";
import fs from "fs";
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

  let httpServer;

  if(process.env.ENABLE_HTTPS === "true") {
    httpServer = https.createServer({
      key: fs.readFileSync("config/ssl/host.key"),
      cert: fs.readFileSync("config/ssl/host.cert"),
    }, app);
  } else {
    httpServer = http.createServer(app);
  }  

  const port = process.env.PORT || 3000;

  info(`
  #########################################################
  ##################### ❇ Blazon ❇ #######################
  #########################################################\n`);
  httpServer.listen(port, () => {
    info(`> Server ready on ${((process.env.ENABLE_HTTPS === "true") && "https") || "http"}://localhost:${port}`);
    info(
      `🚀 Server graphql ready at ${process.env.NEXT_PUBLIC_GRAPHQL_SERVER}`
    );
  });
  return { server, app };
};

export default graphql;
