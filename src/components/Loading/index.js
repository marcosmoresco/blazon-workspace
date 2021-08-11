import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import loadingIcon from "./images/loading.svg";
import loadingBlueIcon from "./images/loadingBlue.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import animationData from "./loading.json";

const useStyles = makeStyles((theme) => ({
  loading: {
    height: 26,
    "& img": {
      animation: "spin 2s linear infinite",
      filter: "inherit !important",
    },
  },
  loadingContainerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    top: 0,
    height: "400px",
    width: "100%",
  },
  loadingContainer: {
    width: 128,
    height: 128,
  },
}));

export default function Loading(props) {
  const { type, container, bgColor } = props;
  const classes = useStyles();
    
  return container ? (
    <div
      className={classes.loadingContainerContent}
      style={{ backgroundColor: bgColor }}
    >
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    </div>
  ) : (
    <div className={classes.loading}>
      <Image
        alt="Loading"
        src={type === "blue" ? loadingBlueIcon : loadingIcon}
      />
    </div>
  );
}

Loading.defaultProps = { bgColor: "#F4F4F5" };
