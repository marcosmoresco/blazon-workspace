import React, { Component } from 'react'
import { createStyles, withStyles } from '@material-ui/core/styles'
import MuiButton from '@material-ui/core/Button'

const useStyles = () => createStyles({
  root: {
    textTransform: 'initial',   
  },
});

class Button extends Component {

  render() {

    const { classes, children, ...other } = this.props

    return (
      <MuiButton
        className={classes.root}
        {...other}
      >
        {children}
      </MuiButton>      
    )
  }
}

export default withStyles(useStyles)(Button)