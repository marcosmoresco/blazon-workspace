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
      height: 42,
      borderRadius: 8
    },         
    '& .Default-contained-red': {
      backgroundColor: '#FF134A',
    },
    '& .Default-contained-blue': {
      backgroundColor: '#FFFFFF',
      border: '1px solid #0E46D7',
      color: '#0E46D7'
    },
    '& .Default-contained-disabled': {
      backgroundColor: '#E9E8EB',
      color: '#A8A6B2',
      cursor: 'default',
      boxShadow: 'none',
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

    const { classes, children, variant, color, isLoading, startIcon, disabled, ...other } = this.props

    const _color = color?.replace("default-", "");

    return (
      <span className={classes.root}>
        <MuiButton
          className={classNames({          
            'Default-rounded': variant === 'rounded',
            'Red': color === 'secondary',
            'Default-contained-red': variant === 'contained' && color === 'secondary',
            'Default-contained-blue': variant === 'contained' && color === 'default-primary',
            'Default-contained-disabled': variant === 'contained' && disabled
          })}       
          startIcon={isLoading === 1 ? <Loading/> : startIcon} 
          color={_color}
          variant={variant}
          {...other}
        >
          {children}
        </MuiButton>
      </span>            
    )
  }
}

export default withStyles(useStyles)(Button)