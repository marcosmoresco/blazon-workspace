import React, { FC, useState } from 'react'
import { withStyles, Theme } from '@material-ui/core/styles'
import { IntlProvider, injectIntl } from 'react-intl'
import Image from 'next/image'
import Button from '../Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import infoIcon from './images/information.svg'
import { useRouter } from 'next/router'
import type { LocalesType } from '../../locales/types'

import messages_en from './translations/en.json'
import messages_pt from './translations/pt.json'

const messages: LocalesType = {
  'en': {...messages_en },
  'pt': {...messages_pt }
}

const styles = (theme:Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),    
    '& .title': {
      color: '232325',
      fontSize: 16
    },
    '& .subTitle': {
      fontSize: 13,
      color: '#777779'
    }
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }  
})

const DialogTitle = withStyles(styles)((props:any) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const stylesContent = () => ({
  root: {
    textAlign: 'center',
    maxWidth: 600,
    '& .Info': {
      width: 43
    },
    '& .Title': {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 23,
      lineHeight: '28px',
      color: '#232325',
      marginTop: 8
    },
    '& .SubTitle': {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '24px',
      textAlign: 'center',
      color: '#232325',
      marginTop: 15
    }
  }
})

const DialogContent = withStyles(stylesContent)(injectIntl((props:any) => {
  const { text, template, classes, onClose, intl, ...other } = props;
  return (
    <MuiDialogContent className={classes.root} {...other}>
      <div className="Info">
        <Image alt="Info" src={infoIcon}/>
      </div>
      <div className="Title">
        {intl.formatMessage({
          id: "app.confirm.message"
        })}
      </div>
      <div className="SubTitle">{text}</div>           
      {template}
    </MuiDialogContent>
  )
}))

const stylesActions = () => ({
  root: {
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    '&.MuiDialogActions-spacing > :not(:first-child)': {
      marginLeft: 0
    },
    '& .Default-Red' : {
      minWidth: 140
    }
  }
})

const DialogActions = withStyles(stylesActions)(injectIntl((props:any) => {
  const { classes, handleCancel, handleConfirm, intl, ...other } = props;
 
  return (
    <MuiDialogActions className={classes.root} {...other}>
      <Button
        variant="contained"
        onClick={handleCancel}
        color="secondary"        
      >
        {intl.formatMessage({
          id: "app.cancel"
        })}
      </Button>
      <Button
        variant="contained"
        onClick={handleConfirm}
        color="default"
      >
        {intl.formatMessage({
          id: "app.confirm"
        })}
      </Button>
    </MuiDialogActions>
  )
}))

export type ConfirmPropsType = { 
  text: string,
  template?: any,
  resolve: any,
  reject?: any   
}

export type ConfirmStateType = { 
  isOpen: boolean
  text: string
  template?: any
}

const Confirm: FC<ConfirmPropsType> = ({text, template, resolve}) => {

  const [isOpen, setIsOpen] = useState(true)
  
  const handleCancel = () => {
    setIsOpen(false)    
    resolve(false)
  }
 
  const handleConfirm = () => {
    setIsOpen(false)
    resolve(true)
  }
  
  const { locale = 'en', defaultLocale } = useRouter() || {}

  return (

    <IntlProvider locale={locale} messages={messages[locale]}>
      <Dialog
        open={isOpen}
        onClose={handleCancel}
        maxWidth="sm" 
        fullWidth={true}
        aria-labelledby="confirm-dialog"
      > 
        <DialogTitle id="customized-confirm-dialog-title" onClose={handleCancel}></DialogTitle>       
        <DialogContent text={text} template={template}/>
        <DialogActions 
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}/>
      </Dialog>
    </IntlProvider>      
  )   
}

export default Confirm