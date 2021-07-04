import React from 'react'
import { FormattedMessage } from 'react-intl'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import MuiDialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import arrowLeft from './images/arrowLeft.svg'


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 0,    
    background: '#F4F4F5',   
  },
  rectangle: {
    width: '35%',
    height: 187,
    background: '#006AC6',
  },
  content: {
    position: 'absolute',
    width: '60%',
    height: 107,
    left: 27,
    top: 40,
    background: '#FFFFFF',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 19,
  },
  title: {
    fontSize: 24,
    color: '#4F486A',
    padding: '16px 24px'
  },
  subTitle: {
    fontSize: 24,
    color: '#232325',
    lineHeight: '36px',
    padding: '16px 24px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 24,
      marginRight: 7,
      cursor: 'pointer',
    }
  },
  image: {
    position: 'absolute',
    top: 0,
    right: '22%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }  
})

const DialogTitle = withStyles(styles)((props) => {
  const { classes, onClose, onBack, text, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>      
      <div className={classes.title}>
        <FormattedMessage id="app.history"/>
      </div>
      <div className={classes.subTitle}>
        {onBack ? <img alt="Arrow left" src={arrowLeft} onClick={() => onBack()}/> : null}
        {text}
      </div>                        
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>      
    </MuiDialogTitle>
  )
})

const stylesContent = (theme) => ({
  root: {
    padding: 0,
    borderBottom: 'none',
    backgroundColor: '#F4F4F5',  
    '&.Background-white': {
      backgroundColor: '#FFFFFF',
    },  
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .MuiInputBase-formControl': {
      width: '100%'     
    },
    '& .Mui-error': {
      marginLeft: 0
    },
    '& input': {     
      padding: '11.5px'
    },
  },
})


const DialogContent = withStyles(stylesContent)((props) => {
  const { children, classes, currentStep, ...other } = props;
  return (
    <MuiDialogContent className={`${classes.root} ${currentStep !== 1 ? "Background-white" : ""}`} {...other}>
      {children}
    </MuiDialogContent>
  )
})

const stylesDialog = (theme) => ({
  root: {
    '&.Add-min-height': {
      '& .MuiDialog-paper': {
        minHeight: 'calc(100% - 64px)'
      } 
    }          
  },  
})

const DialogHistory = withStyles(stylesDialog)((props) => {
  const { children, classes, currentStep, ...other } = props;
  return (
    <MuiDialog className={`${classes.root} ${currentStep === 1 ? "Add-min-height" : ""}`} {...other}>
      {children}
    </MuiDialog>
  )
})

export default function CustomizedDialogHistory(props) {
  
  const {text, open, onSave, onClose, onBack, isValid, header, noActions, maxWidth, ...other} = props 

  const handleClose = () => {
    onClose()
  }

  return (
    <div>      
      <DialogHistory 
        {...other}
        maxWidth={false} 
        fullWidth={true}
        onClose={handleClose} 
        aria-labelledby="customized-dialog-title" 
        open={open}>
        <DialogTitle id="customized-dialog-title" text={text} onClose={handleClose} onBack={onBack}/>
        <DialogContent dividers>
          {props.children}         
        </DialogContent>                    
      </DialogHistory>
    </div>
  )
}