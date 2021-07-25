import Dialog from '@components/Dialog'
import Divider from '@components/Divider'
import PasswordField from '@components/PasswordField'
import TextField from '@components/TextField'
import { Form, Formik } from 'formik'
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import * as Yup from 'yup'

type NewPasswordProps = {
  open: boolean
  onClose(): void
  onSave(sucess: boolean): void
}

const initialValues = {
  changePassword: {
    asset: '',
    description: '',
    uri: '',
    user: '',
    password: ''
  }
}

const validationSchema = Yup.object({
  changePasswordForm: Yup.object({
    asset: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    description: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    uri: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    user: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    password: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required')
  }).required('Required')
})

const NewPassword: FC<NewPasswordProps> = ({ open, onClose, onSave }) => {
  const intl = useIntl()

  const formik = {
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2))
    }
  }

  return (
    <Formik
      {...formik}
      render={(form) => (
        <Dialog
          cancelButton={true}
          open={open}
          title={intl.formatMessage({
            id: 'changepasswordform.dialog.title'
          })}
          isValid={true}
          onSave={() => {
            onClose()
            onSave?.(true)
          }}
          onClose={onClose}
        >
          <Form className='modal'>
            <div>
              <div className='modal-section'>
                {intl.formatMessage({
                  id: 'passwordVault.newpassword.info.title'
                })}
              </div>
              <div className='modal-description'>
                {intl.formatMessage({
                  id: 'passwordVault.newpassword.info.description'
                })}
              </div>
              <div className='pt32'></div>
            </div>

            <TextField form={form} name='changePasswordForm.name' />
            <div className='pt18'></div>
            <TextField form={form} name='changePasswordForm.description' />
            <div className='pt18'></div>
            <TextField form={form} name='changePasswordForm.uri' />
            <div className='pb32 pt32'>
              <Divider />
            </div>

            <div>
              <div className='modal-section'>
                {intl.formatMessage({
                  id: 'passwordVault.newpassword.access.title'
                })}
              </div>
              <div className='modal-description'>
                {intl.formatMessage({
                  id: 'passwordVault.newpassword.access.description'
                })}
              </div>
              <div className='pt32'></div>
            </div>
            <TextField form={form} name='changePasswordForm.user' />
            <div className='pt18'></div>
            <PasswordField form={form} name='changePasswordForm.password' />
          </Form>
        </Dialog>
      )}
    />
  )
}

export default NewPassword
