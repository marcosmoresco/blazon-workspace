import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiRadio from '@material-ui/core/Radio'

const Radio = withStyles({
  root: {   
    '&$checked': {
      color: '#004095',
    },
  },
  checked: {},
})((props) => <MuiRadio color="default" {...props} />);

export default function CustomizedRadio(props) {

  return (
    <Radio
      {...props}      
    />
  )
}