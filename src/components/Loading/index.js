import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingIcon from "@icons/Loading";

const useStyles = makeStyles((theme) => ({
  loading: {
    height: 26,
    "& svg": {
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
      {type === "blue" ? <LoadingIcon color="#006AC6" width={22} height={22}/> : <LoadingIcon width={22} height={22}/>}
    </div>
  );
}

Loading.defaultProps = { bgColor: "#F4F4F5" };
