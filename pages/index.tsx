import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Menu from '../src/portal/Menu'
import Home from "../src/portal/Home";

const useStyles = makeStyles(() => ({
  content: {},
}));

export default function Index() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.content}>
        <Home />
      </div>
    </div>
  );
}
