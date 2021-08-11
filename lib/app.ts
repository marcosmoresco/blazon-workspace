import express from "express";
const session = require("express-session");
import cors from "cors";
import axios from "axios";
const uid = require("uid-safe");
import passport from "./passport";
import { info, error } from "./log";

//Create server express
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({
  credentials: true // enable set cookie
}));

//Config session
const sessionConfig = {
  secret: uid.sync(18),
  cookie: {
    maxAge: 86400 * 1000, // 24 hours in milliseconds
  },
  resave: true,
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
  async (req: any, res: any) => {

    info(" \n ............. Requesting token oauth .............\n");
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "urn:ietf:params:oauth:grant-type:saml2-bearer");
      params.append("assertion", req.body.SAMLResponse);

      const response = await axios.post(
        `${process.env.SERVER_OAUTH}/blazon-oauth-server/oauth2/token.oauth2`,
        params,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",            
          },          
        }
      );     
      req.session.passport.AccessToken = response.data.access_token;
      req.session.passport.RefreshToken = response.data.refresh_token;
      info(`Response OAuth token success, expire in ${response.data.expires_in} milliseconds \n`);           
      res.redirect("/");
    } catch(e) {      
      res.sendStatus(500);
    }       
  }
);

server.get("/logout", (req: any, resp: any, next: any) => {
  var passportSaml = passport._strategy("saml");
  try {
    passportSaml.logout(req, (err: any, urlLogoutRequest: string) => {
      if (!!err) {
        error(err);
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

server.post("/logout", (req: any, res: any, next: any) => {
  //Logout user
  req.logout();
  res.redirect("/");
});

server.get("*", ensureAuthenticated, function (req: any, res: any, next: any) {
  next();
});

export default server;
