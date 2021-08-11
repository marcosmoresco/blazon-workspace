import React, { FC } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TooltipMui from "@material-ui/core/Tooltip";
import type { TooltipProps } from "./types";

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: "#26213F",       
  },
  tooltip: {
    backgroundColor: "#26213F",
    fontSize: 16,
    maxWidth: 560,
    padding: "4px 21px",
    borderRadius: 20,    
    "& .Tooltip-title-content": {
      margin: "24px 28px",
    },
    "& .Lightbulb": {
      marginRight: 12,
    },
    "& .Tooltip-title": {
      fontSize: 24,
      color: "#FFFFFF",
      lineHeight: "30px",
    },
    "& .Tooltip-subTitle": {
      marginTop: 17,
      marginBottom: 24,
    },
    "& .MuiTooltip-arrow": {
      marginTop: "-0.51em !important",
    }
  },
}));

function BootstrapTooltip(props: any) {
  const classes = useStylesBootstrap();

  return <TooltipMui arrow classes={classes} {...props} />;
}

const Tooltip: FC<TooltipProps> = ({ title, placement, children }) => {
  return (
    <BootstrapTooltip title={title} placement={placement} interactive>
      {children}
    </BootstrapTooltip>
  );
};

Tooltip.defaultProps = { placement: "bottom-start" };

export default Tooltip;
