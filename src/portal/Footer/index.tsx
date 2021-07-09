import React, { FC } from "react";
import Image from "next/image";
import type { FooterProps } from "./types";
import { BoxFooter } from "./styles";
import LogoImg from "./images/logo.svg";

const Footer: FC<FooterProps> = ({ classes }) => {
  return (
    <BoxFooter>
      <Image alt="Logo" src={LogoImg} />
    </BoxFooter>
  );
};

export default Footer;