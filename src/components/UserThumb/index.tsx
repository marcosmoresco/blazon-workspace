import React from "react";
import classNames from "classnames";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { getAttribute } from "../../utils/attributes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    background: "#F0F0F1",
    borderRadius: 64,
    width: "fit-content",
    "&.Box": {
      padding: 5,
    },
    "& .User-thumb-large": {
      width: 120,
      height: 120,
    },
    "& .User-thumb-small": {
      width: 32,
      height: 32,
    },
  },
  username: {
    fontSize: 14,
    color: "#514D65",
  },
  displayName: {
    marginRight: 8
  },
}));

export default function UserThumb(props) {
  const classes = useStyles();
  const { displayName, username, isLarge, isSmall, image } = props;

  let user = props.user || {};

  let thumbUrl = null;

  return (
    <div className={`${classes.root} ${displayName ? "Add-box" : ""}`}>
      <React.Fragment>
        <Avatar
          className={classNames({
            "User-thumb-large": isLarge,
            "User-thumb-small": isSmall,
          })}
          style={displayName ? { marginRight: 10 } : {}}
          alt={displayName}
          src={image}
        />
        <div>
          {username ? <div className={classes.username}>{username}</div> : null}
          {displayName ? <div className={classes.displayName}>{displayName}</div> : null}
        </div>
      </React.Fragment>
    </div>
  );
}
