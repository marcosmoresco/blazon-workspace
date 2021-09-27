import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChangePhone from "@modules/User/ChangePhone";

const useStyles = makeStyles(() => ({
  content: {},
}));

export default function Index() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.content}>
        <ChangePhone />
      </div>
    </div>
  );
}
