import PasswordField from '@components/PasswordField'
import TextField from '@components/TextField'
import { Form, Formik } from 'formik'
import React, { FC } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import * as Yup from 'yup'

type NewPasswordProps = {}

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

const NewPassword: FC<NewPasswordProps> = () => {
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
        <Form>
          <TextField form={form} name='changePasswordForm.name' />
          <TextField form={form} name='changePasswordForm.description' />
          <TextField form={form} name='changePasswordForm.uri' />
          <TextField form={form} name='changePasswordForm.user' />
          <PasswordField form={form} name='changePasswordForm.password' />
        </Form>
      )}
    />
  )
}

export default injectIntl(NewPassword)
