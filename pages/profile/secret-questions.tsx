import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SecretQuestions from "@modules/User/SecretQuestions";

const useStyles = makeStyles(() => ({
  content: {},
}));

export default function Index() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.content}>
        <SecretQuestions />
      </div>
    </div>
  );
}
