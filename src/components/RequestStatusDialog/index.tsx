import Dialog from '@components/Dialog'
import CircleSuccessIcon from '@icons/CircleSuccess'
import React, { FC } from 'react'
import { RequestStatusDialogProps } from './types'
import { useStyles } from './styles'
import CircleErrorIcon from '@icons/CircleError'
import { useIntl } from 'react-intl'
import X from '@icons/X'

type ModalContent = {
  message: string
  onClose(): void
}

const SucessContent: FC<ModalContent> = ({ message, onClose }) => {
  const classes = useStyles()
  const intl = useIntl()
  return (
    <div>
      <div onClick={onClose} style={{ textAlign: 'right' }}>
        <X width={21} height={21} />
      </div>
      <div className={classes.icon}>
        <CircleSuccessIcon />
      </div>
      <div className={classes.title}>
        {intl.formatMessage({ id: 'success.message' })}
      </div>
      <div className={classes.subtitle}>
        {message && intl.formatMessage({ id: message })}
      </div>
    </div>
  )
}

const ErrorContent: FC<ModalContent> = ({ message, onClose }) => {
  const classes = useStyles()
  const intl = useIntl()
  return (
    <div>
      <div onClick={onClose} style={{ textAlign: 'right' }}>
        <X width={21} height={21} />
      </div>
      <div className={classes.icon}>
        <CircleErrorIcon />
      </div>
      <div className={classes.title}>
        {intl.formatMessage({ id: 'error.message' })}
      </div>
      <div className={classes.subtitle}>
        {message && intl.formatMessage({ id: message })}
      </div>
    </div>
  )
}

const RequestStatusDialog: FC<RequestStatusDialogProps> = ({
  success,
  onClose,
  message,
  open
}) => {
  const TargetElement = success ? SucessContent : ErrorContent

  return (
    <Dialog maxWidth="sm" open={open} noActions={true} hideTitle={true} onClose={onClose}>
      <TargetElement message={message} onClose={onClose} />
    </Dialog>
  )
}

export default RequestStatusDialog
