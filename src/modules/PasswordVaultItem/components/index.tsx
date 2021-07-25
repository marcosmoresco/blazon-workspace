import React, { Component, FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import X from '../../../icons/X'
import Instagram from './images/instagram.svg'
import TextField from '../../../components/TextField'
import type { PasswordVaultProps, PasswordVaultState } from './types'
import useStyles from './styles'
import { Formik } from 'formik'
import PasswordField from '@components/PasswordField'
import { useIntl } from 'react-intl'
import useMockRequest from '@utils/mockRequest'
import Loading from '@components/Loading'
import Dialog from '@components/Dialog'
import Divider from '@components/Divider'

const validationSchema = {}
const initialValues = {}

const types = { Instagram }

const mockData = {
  id: 5,
  type: 'Instagram',
  email: 'test@gmail.com',
  password: '12345'
}

const PasswordVault: FC<PasswordVaultProps> = ({
  classes,
  open,
  passwordVault,
  onClose,
  onSave
}) => {
  const intl = useIntl()

  const { loading, data: passwordVaultItem } = useMockRequest(
    { ...mockData },
    500
  )

  const formik = {
    initialValues: {
      passwordVaultForm: passwordVaultItem || initialValues
    },
    validationSchema,
    handleSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2))
    },
    enableReinitialize: true
  }

  return (
    <Formik
      {...formik}
      render={({ values }) => (
        <Dialog
          onClose={() => onClose(passwordVault)}
          open={open}
          title={passwordVault.name}
          saveLabel={intl.formatMessage({ id: 'app.share' })}
          cancelButton={true}
          onSave={onSave}
          isValid={true}
        >
          {loading ? (
            <Loading container={true} />
          ) : (
            <div className={`${classes.root} modal`}>
              <div className={classes.passwordVaultCardContent}>
                <div className={classes.passwordVaultCardContentHeader}>
                  <Image
                    src={types[values.passwordVaultForm.type]}
                    alt={values.passwordVaultForm.type}
                    width={64}
                    height={64}
                  />
                </div>

                <div className='pt32'></div>
                <div>
                  <div className='modal-section'>
                    {intl.formatMessage({
                      id: 'passwordvault.modal.info.title'
                    })}
                  </div>
                  <div className='modal-description'>
                    {intl.formatMessage({
                      id: 'passwordvault.modal.info.description'
                    })}
                  </div>
                  <div className='pt32'></div>
                </div>
                <form>
                  <TextField
                    name='passwordVaultForm.email'
                    className={classes.margin}
                  />
                  <div className='pt18'></div>
                  <PasswordField
                    name='passwordVaultForm.password'
                    className={classes.margin}
                  />
                  <Divider className={classes.divider} />
                </form>
              </div>
            </div>
          )}
        </Dialog>
      )}
    />
  )
}

export default withStyles(useStyles)(PasswordVault)
