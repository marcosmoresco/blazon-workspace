import React, { Component } from 'react'
import { createStyles, withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import MuiButton from '@material-ui/core/Button'
import Loading from '../Loading'
import type { ButtonPropsType } from './types'

const useStyles = () => createStyles({
  root: {
    '& button': {
      textTransform: 'initial',
      height: 42
    },     
    '& .Default-rounded': {
      minWidth: 'auto',
      borderRadius: '20px',
      fontWeight: 600,
      padding: '6px 16px',
      color: '#FFFFFF',
      '&.Green': {
        backgroundColor: '#06AD5D',            
        '&.MuiButton-root:hover': {
          backgroundColor: '#06AD5D',
        }
      },
      '&.Red': {
        backgroundColor: '#FF134A',            
        '&.MuiButton-root:hover': {
          backgroundColor: '#FF134A',
        },        
      },              
    },  
  },
});

class Button extends Component<ButtonPropsType> {

  render() {

    const { classes, children, variant, color, isLoading, startIcon, ...other } = this.props

    return (
      <span className={classes.root}>
        <MuiButton
          className={classNames({          
            'Default-rounded': variant === 'rounded',
            'Red': color === 'secondary'
          })}       
          startIcon={isLoading === 1 ? <Loading/> : startIcon} 
          {...other}
        >
          {children}
        </MuiButton>
      </span>            
    )
  }
}

export default withStyles(useStyles)(Button)