import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import Button from '../../../components/Button'
import X from '../../../icons/X'
import CaretRight from '../../icons/CaretRight.svg'
import Instagram from './images/instagram.svg'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import TextField from '../../../components/TextField'
import type { PasswordVaultProps, PasswordVaultState } from './types'
import useStyles from './styles'

class PasswordVault extends Component<PasswordVaultProps, PasswordVaultState> {

  constructor(props:any) {
    super(props)     
  }

  render() {

    const { 
      classes, 
      open,
      passwordVault,
      onClose 
    } = this.props      

    return (
      <Dialog 
        onClose={onClose} 
        open={open}>
        <div className={classes.root}>
          <div className={classes.close} onClick={onClose}>
            <X width={18} height={18}/>
          </div>  
          <div className={classes.passwordVaultCardContent}>
            <div className={classes.passwordVaultCardContentHeader}>
              <Image src={Instagram} alt="Instagram" width={64} height={64}/>
            </div>
            <div className={classes.passwordVaultCardContentHeaderTitle}>
              {passwordVault.title}
            </div>
            <div className={classes.passwordVaultCardContentHeaderText}>
              {passwordVault.text}
            </div>
            <form className={classes.form}>
              <FormControl 
                fullWidth={true} 
                margin="normal"
              >
                <label>E-mail</label>
                <TextField
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label=""
                  variant="outlined"                
                />
              </FormControl>  
              <FormControl 
                fullWidth={true} 
                margin="normal"
              >
                <label>Senha</label>
                <TextField
                  type="password"
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label=""
                  variant="outlined"                
                />
              </FormControl>   
              <Divider className={classes.divider}/>         
            </form>
          </div>
        </div>
      </Dialog>      
    )
  }
}

export default withStyles(useStyles)(PasswordVault)