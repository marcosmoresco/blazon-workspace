import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChangeEmail from "@modules/User/ChangeEmail";

const useStyles = makeStyles(() => ({
  content: {},
}));

export default function Index() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.content}>
        <ChangeEmail />
      </div>
    </div>
  );
}
