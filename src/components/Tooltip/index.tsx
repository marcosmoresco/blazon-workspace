import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TooltipMui from '@material-ui/core/Tooltip'

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#26213F",
  },
  tooltip: {
    backgroundColor: "#26213F",    
    fontSize: 14,
    maxWidth: 560,   
    '& .Tooltip-title-content': {
      margin: '24px 28px',
    },
    '& .Lightbulb': {
      marginRight: 12,
    },
    '& .Tooltip-title': {
      fontSize: 24,
      color: '#FFFFFF',
      lineHeight: '30px',
    },
    '& .Tooltip-subTitle': {
      marginTop: 17,
      marginBottom: 24,
    },
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <TooltipMui arrow classes={classes} {...props} />;
}

export default function Tooltip(props) {  

  return (      
    <BootstrapTooltip title={props.title} placement={props.placement || "bottom-start"} interactive>
      {props.children}
    </BootstrapTooltip>                                                          
  )
} 