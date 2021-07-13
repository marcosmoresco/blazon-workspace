import next from "next";
import startApolloServer from "./lib/graphql";

const dev = process.env.APP_ENV === "development" || !process.env.APP_ENV;
const server = next({ dev });
const handle = server.getRequestHandler();

server.prepare().then(() => {
  startApolloServer().then(({ app }) => {
    app.get("*", (req: any, res: any) => {
      return handle(req, res);
    });
  });
});
