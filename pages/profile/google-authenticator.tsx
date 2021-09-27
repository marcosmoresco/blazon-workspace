import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GoogleAuthenticator from "@modules/User/GoogleAuthenticator";

const useStyles = makeStyles(() => ({
  content: {},
}));

export default function Index() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.content}>
        <GoogleAuthenticator />
      </div>
    </div>
  );
}
