import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl, IntlShape } from 'react-intl'
import useStyles from './styles'
import { Formik } from 'formik'
import * as Yup from 'yup'
import PasswordField from '@components/PasswordField'
import CardScreen from '@components/CardScreen'
import Button from '@components/Button'
import { Divider } from '@material-ui/core'
import User from '@icons/User'
import { useRouter } from 'next/router'
import { StyledForm } from '../EditProfile'

type ChangePasswordScreenProps = {
  intl: IntlShape
  classes: any
}

const initialValues = {
  changePassword: {
    currentPassword: '',
    newPassword: '',
    repeatPassword: ''
  }
}

const validationSchema = Yup.object({
  changePassword: Yup.object({
    currentPassword: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    newPassword: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    repeatPassword: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required')
  }).required('Required')
})

const ChangePassword: FC<ChangePasswordScreenProps> = ({ classes, intl }) => {
  const router = useRouter()

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
        <CardScreen
          title='profile'
          subTitle='changepassword.header.title'
          icon={<User height={24} width={24} />}
          onBack={() => router.push('/profile')}
          actions={
            <div>
              <Button
                type='submit'
                onClick={form.submitForm}
                color='primary'
                variant='contained'
              >
                {intl.formatMessage({ id: 'save' })}
              </Button>
            </div>
          }
        >
          <div className={classes.header}>
            <div className={classes.title}>
              {intl.formatMessage({ id: `changepassword.title` })}
            </div>
            <div className={classes.description}>
              {intl.formatMessage({ id: `changepassword.description` })}
            </div>
          </div>
          <Divider />

          <StyledForm className={classes.form}>
            <PasswordField form={form} name='changePassword.currentPassword' />
            <PasswordField form={form} name='changePassword.newPassword' />
            <PasswordField form={form} name='changePassword.repeatPassword' />
          </StyledForm>
        </CardScreen>
      )}
    />
  )
}

export default withStyles(useStyles)(injectIntl(ChangePassword))
