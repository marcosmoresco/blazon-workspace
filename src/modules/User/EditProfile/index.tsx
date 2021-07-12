import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl, IntlShape } from 'react-intl'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import useStyles from './styles'
import CardScreen from '@components/CardScreen'
import Button from '@components/Button'
import { PersonOutline } from '@material-ui/icons'
import { Avatar, Divider, Grid } from '@material-ui/core'
import TextField from '@components/TextField'
import { useRouter } from 'next/router'

type EditProfileProps = {
  intl: IntlShape
  classes: any
}

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmation: ''
}

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  birthDate: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  zipCode: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  companyDocument: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  companyName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  document: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required')
})

const EditProfile: FC<EditProfileProps> = ({ classes, intl }) => {
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
          subTitle='profileedit.title'
          icon={<PersonOutline />}
          onBack={() => router.push('/profile')}
          actions={
            <div>
              <Button
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
              {intl.formatMessage({ id: `profileedit.title` })}
            </div>
            <div className={classes.description}>
              {intl.formatMessage({ id: `profileedit.description` })}
            </div>
          </div>
          <Divider />

          <div className={classes.userHeader}>
            <div className={classes.userHeaderBg}>
              <Avatar src='/Avatar.svg' className={classes.avatar}></Avatar>
            </div>
          </div>
          <Form className={classes.formControl}>
            <TextField form={form} name='name' label='profile.edit.name' />
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  form={form}
                  name='birthdate'
                  label='profile.edit.birthdate'
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  form={form}
                  name='zipcode'
                  label='profile.edit.zipcode'
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  form={form}
                  name='document'
                  label='profile.edit.document'
                />
              </Grid>
            </Grid>
            <TextField form={form} name='name' label='profile.edit.name' />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  form={form}
                  name='companydocument'
                  label='profile.edit.companydocument'
                />
              </Grid>
              <Grid item xs={6} className='lpad'>
                <TextField
                  form={form}
                  name='companyName'
                  label='profile.edit.companyname'
                />
              </Grid>
            </Grid>
          </Form>
        </CardScreen>
      )}
    />
  )
}

export default withStyles(useStyles)(injectIntl(EditProfile))
