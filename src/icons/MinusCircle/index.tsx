import { makeStyles, createStyles } from "@material-ui/core/styles";
import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  href?: string;
  className?: string;
};

export default function MinusCircleIcon(props: IconProps) {
  const { width, height, color } = props;

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        stroke: color,

        "&:hover": {
          stroke: "#ffff",
          cursor: "pointer",
        },
      },
    })
  );

  const classes = useStyles();
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.root}
    >
      <path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke={classes.root}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 16H21"
        stroke={classes.root}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

MinusCircleIcon.defaultProps = {
  width: 32,
  height: 32,
  color: "#26213f",
};
