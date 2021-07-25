import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'
import Button from '../Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#F1F1FE',
    '& .title': {
      lineHeight: '31px',
      color: '#4F486A',
      fontSize: 24
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
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '30px 42px',
    borderBottom: 'none',
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
    }
  }
}))(MuiDialogContent)

const stylesActions = (theme) => ({
  root: {
    margin: 0,
    height: 90,
    paddingRight: 40,
    background: '#E9E8EB',
    boxShadow: '0px 4px 74px rgba(0, 0, 0, 0.25)',
    paddingLeft: 40,
    paddingRight: 40
  }
})

const DialogActions = withStyles(stylesActions)((props) => {
  const { children, classes, ...other } = props
  return (
    <MuiDialogActions className={classes.root} {...other}>
      {children}
    </MuiDialogActions>
  )
})

export default function CustomizedDialogs(props) {
  const {
    title,
    subTitle,
    saveLabel,
    open,
    onSave,
    onClose,
    isValid,
    header,
    noActions,
    maxWidth,
    isLoading,
    fullWidth,
    cancelButton,
    hideTitle,
    ...other
  } = props

  const handleClose = () => {
    onClose()
  }

  const save = () => {
    onSave()
  }

  return (
    <div>
      <Dialog
        {...other}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth={(maxWidth && maxWidth) || 'md'}
        fullWidth={fullWidth}
      >
        {!hideTitle && (
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            {header ? (
              header
            ) : (
              <React.Fragment>
                <div className='title'>{title}</div>
                <div className='subTitle'>{subTitle}</div>
              </React.Fragment>
            )}
          </DialogTitle>
        )}
        <DialogContent dividers>{props.children}</DialogContent>
        {!noActions ? (
          <DialogActions>
            {cancelButton && (
              <Button
                variant='contained'
                onClick={onClose}
                className='buttonCancel'
                isLoading={isLoading ? 1 : 0}
              >
                <FormattedMessage id='app.cancel' />
              </Button>
            )}
            <div style={{ flex: '1 0 0' }} />
            <Button
              variant='contained'
              color='primary'
              onClick={save}
              className='buttonSave'
              disabled={!isValid}
              isLoading={isLoading ? 1 : 0}
            >
              {(saveLabel && saveLabel) || <FormattedMessage id='app.save' />}
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>
    </div>
  )
}

CustomizedDialogs.defaultProps = {
  fullWidth: true,
  cancelButton: false,
  hideTitle: false
}
