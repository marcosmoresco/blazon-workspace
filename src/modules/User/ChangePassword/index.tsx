import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl, IntlShape } from 'react-intl'
import useStyles from './styles'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import PasswordField from '@components/PasswordField'
import CardScreen from '@components/CardScreen'
import Button from '@components/Button'
import { Divider } from '@material-ui/core'
import User from '@icons/User'
import { useRouter } from 'next/router'

const FullSizePasswordField = withStyles((theme) => ({
  root: {
    paddingTop: 16
  }
}))(PasswordField)

type ChangePasswordScreenProps = {
  intl: IntlShape
  classes: any
}

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmation: ''
}

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  newPassword: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  confirmation: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required')
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
          subTitle='changepassword.new.password'
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

          <Form className={classes.form}>
            <FullSizePasswordField
              fullWidth={true}
              form={form}
              name='currentPassword'
              placeholder={intl.formatMessage({
                id: 'changepassword.current.password'
              })}
              label={intl.formatMessage({
                id: 'changepassword.insert.current.password'
              })}
            />
            <div className={classes.forgetPassword}>
              <a href='#'>
                {intl.formatMessage({
                  id: 'changepassword.forget.password'
                })}
              </a>
            </div>
            <FullSizePasswordField
              fullWidth={true}
              form={form}
              name='newPassword'
              placeholder={intl.formatMessage({
                id: 'changepassword.insert.new.password'
              })}
              label={intl.formatMessage({
                id: 'changepassword.new.password'
              })}
            />
            <FullSizePasswordField
              fullWidth={true}
              form={form}
              name='confirmation'
              placeholder={intl.formatMessage({
                id: 'changepassword.insert.new.password'
              })}
              label={intl.formatMessage({
                id: 'changepassword.new.password'
              })}
            />
          </Form>
        </CardScreen>
      )}
    />
  )
}

export default withStyles(useStyles)(injectIntl(ChangePassword))
