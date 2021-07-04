import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { createStyles, withStyles } from '@material-ui/core/styles'
import MuiTextField from '@material-ui/core/TextField'
import type {TextFieldPropsType} from './types'

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

class TextField extends Component<TextFieldPropsType> {

  render() {

    const { classes, intl, required, variant, label, ...other } = this.props

    let inputLabel = label
    if(label && label.type) {
      inputLabel = intl.formatMessage({id: label.props.id})
    } 

    return (
      <React.Fragment>
        <label>{inputLabel}{required && '*'}</label>
        <div className={classes.root}>
          <MuiTextField          
            {...other}
            label=""  
            variant={variant || 'outlined'}         
          /> 
        </div>
      </React.Fragment>                    
    )
  }
}

export default withStyles(useStyles)(injectIntl(TextField))