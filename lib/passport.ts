const passport = require("passport");
import { Strategy as SamlStrategy } from "passport-saml";

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

const samlConfig = {
  path: process.env.SAML_CONSUMERURL,
  entryPoint: process.env.SAML_ENTRYPOINT,
  issuer: process.env.SAML_ISSUER,
  logoutUrl: process.env.SAML_LOGOUTURL,
  acceptedClockSkewMs: -1,
  protocol: process.env.ENABLE_HTTPS === "true" ? "https://" : "http://"
};

const samlStrategy = new SamlStrategy(samlConfig, function (
  profile: any,
  done: any
) {
  return done(null, {
    nameID: profile.nameID,
    nameIDFormat: profile.nameIDFormat,
    id: profile.userID,
    sessionIndex: profile.sessionIndex    
  });
});

passport.use(samlStrategy);

export default passport;
