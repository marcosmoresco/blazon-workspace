import React, { Component } from 'react'
import { createStyles, withStyles } from '@material-ui/core/styles'
import MuiTextField from '@material-ui/core/TextField'

const useStyles = () => createStyles({
  root: {
    width: '100%',
    '& .MuiTextField-root': {
      width: '100%',
    },
    '& input': {
      padding: '11.5px'
    },
    '& .MuiFormHelperText-root.Mui-error': {
      marginLeft: 0
    }
  },
});

class TextField extends Component {

  render() {

    const { classes, ...other } = this.props

    return (
      <div className={classes.root}>
         <MuiTextField          
          {...other}
        /> 
      </div>              
    )
  }
}

export default withStyles(useStyles)(TextField)