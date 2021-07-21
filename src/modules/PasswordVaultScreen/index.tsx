import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl, IntlShape } from 'react-intl'
import useStyles from './styles'
import NewPassword from './NewPassword'
import Dialog from '@components/Dialog'

type PasswordVaultScreenProps = {
  intl: IntlShape
  classes: any
}
const PasswordVaultScreen: FC<PasswordVaultScreenProps> = ({
  classes,
  intl
}) => {
  return (
    <div>
      <Dialog
        open={true}
        title={intl.formatMessage({ id: 'changepasswordform.dialog.title' })}
      >
        <NewPassword />
      </Dialog>
    </div>
  )
}

export default withStyles(useStyles)(injectIntl(PasswordVaultScreen))
