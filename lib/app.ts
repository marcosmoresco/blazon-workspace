import express from "express";
const session = require("express-session");
const uid = require("uid-safe");
import passport from "./passport";

//Create server express
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Config session
const sessionConfig = {
  secret: uid.sync(18),
  cookie: {
    maxAge: 86400 * 1000, // 24 hours in milliseconds
  },
  resave: false,
  saveUninitialized: true,
};
server.use(session(sessionConfig));

//Config passport
server.use(passport.initialize());
server.use(passport.session());

function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) return next();
  else return res.redirect("/login");
}

server.post(
  "/saml/consume",
  passport.authenticate("saml", {
    failureRedirect: "/app/failed",
    failureFlash: true,
  }),
  (req, res) => {
    return res.redirect("/");
  }
);

server.get(
  "/login",
  passport.authenticate("saml", { failureRedirect: "/login/fail" }),
  function (req, res) {
    res.redirect("/");
  }
);

server.post(
  "/login/callback",
  passport.authenticate("saml", { failureRedirect: "/login/fail" }),
  function (req, res) {
    res.redirect("/");
  }
);

server.get("/saml/logout", (req: any, resp: any, next: any) => {
  var passportSaml = passport._strategy("saml");
  try {
    passportSaml.logout(req, (err: any, urlLogoutRequest: string) => {
      if (!!err) {
        console.log(err);
        resp.send(500, "Erro ao fazer logout ...");
        next();
        return;
      }
      resp.redirect(urlLogoutRequest);
    });
  } catch (e) {
    resp.send(500, "Erro ao fazer logout ...");
    next();
  }
});

server.post("/saml/logout", (req: any, res: any, next: any) => {
  //Logout user
  req.logout();
  res.redirect("/");
});

server.get("*", ensureAuthenticated, function (req: any, res: any, next: any) {
  next();
});

export default server;
