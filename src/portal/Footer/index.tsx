import React, { FC } from "react";
import { withStyles } from "@material-ui/core/styles";
import Image from "next/image";
import type { FooterProps } from "./types";
import useStyles from "./styles";
import LogoImg from "./images/logo.svg";

const Footer: FC<FooterProps> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Image alt="Logo" src={LogoImg} />
    </div>
  );
};

export default withStyles(useStyles)(Footer);
