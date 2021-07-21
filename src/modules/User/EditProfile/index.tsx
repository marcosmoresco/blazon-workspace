import React, { FC, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl, IntlShape } from 'react-intl'
import { Form, Formik } from 'formik'
import useStyles from './styles'
import CardScreen from '@components/CardScreen'
import Button from '@components/Button'
import { PersonOutline } from '@material-ui/icons'
import { Avatar, Divider } from '@material-ui/core'
import TextField from '@components/TextField'
import { useRouter } from 'next/router'
import CameraIcon from '@icons/Camera'
import { forOwn, get } from 'lodash'
import useMockRequest from '../../../utils/mockRequest'
import { useUser } from '@hooks'
import Dialog from '@components/Dialog'
import EditAvatar from './EditAvatar'

type EditProfileProps = {
  intl: IntlShape
  classes: any
}

const mockData = {
  identifier: 1,
  createdAt: '04/08/2020 17:11:26',
  modifiedAt: '01/06/2021 08:46:30',
  certificatedAt: '24/08/2020 08:27:28',
  risk: 'LOW',
  username: 'teste',
  firstName: 'Marcos',
  middleName: 'Alberto',
  lastName: 'Lopes',
  lastAccess: '14/07/2021 09:51:24',
  status: 'ACTIVE',
  email: 'malopes21@gmail.com',
  personalEmail: 'malopes21@gmail.com',
  displayName: 'MARCOS LOPES',
  primaryPhone: '998780925',
  locked: false,
  links: [
    {
      rel: 'thumb',
      href: 'http://localhost:8087/blazon-workspace-backend/public/workspace/images/defaultUserThumb'
    },
    {
      rel: 'photo',
      href: 'http://localhost:8087/blazon-workspace-backend/public/workspace/images/defaultUserPhoto'
    },
    {
      rel: 'self',
      href: 'http://localhost:8087/blazon-workspace-backend/workspace/directory/users/1?expand=false'
    },
    {
      rel: 'changepassword',
      href: 'http://localhost:8087/blazon-workspace-backend/workspace/directory/users/changepassword'
    },
    {
      rel: 'accounts',
      href: 'http://localhost:8087/blazon-workspace-backend/workspace/directory/accounts/user{?page,size,expand,ord}'
    },
    {
      rel: 'roles',
      href: 'http://localhost:8087/blazon-workspace-backend/workspace/directory/roles/user{?page,size,expand,q,ord}'
    }
  ]
}

export const StyledForm = withStyles(() => ({
  root: {
    padding: 24,
    '& label': {
      paddingTop: 24
    }
  }
}))((props: any) => <Form {...props} className={props.classes.root} />)

const EditProfile: FC<EditProfileProps> = ({ classes, intl }) => {
  const fields = [] as {
    name: string
    value: any
    type: string
  }[]
  const { loading, data: profileEditForm } = useMockRequest(mockData)
  const [modalOpen, setModalOpen] = useState(false)

  const [, thumb] = useUser()
  const router = useRouter()

  const formik = {
    initialValues: { profileEditForm },
    validationSchema: {},
    onSubmit: (values: any) => {
      console.log(values)
    },
    enableReinitialize: true
  }

  if (profileEditForm) {
    forOwn(profileEditForm, function (value, key) {
      if (
        [
          'links',
          'identifier',
          'createdat',
          'modifiedat',
          'certificatedat',
          'lastaccess',
          'locked'
        ].includes(key.toLowerCase())
      )
        return

      fields.push({
        name: `profileEditForm.${key}`,
        value,
        type:
          typeof value === 'string'
            ? 'text'
            : typeof value === 'string'
            ? 'number'
            : 'text'
      })
    })
  }

  return (
    <>
      <Dialog
        onClose={() => setModalOpen(false)}
        fullWidth={false}
        isValid={true}
        open={modalOpen}
        title={intl.formatMessage({ id: 'profile.edit.avatar.dialog' })}
        onSave={() => {}}
      >
        <EditAvatar />
      </Dialog>
      <Formik
        {...formik}
        render={(form) => {
          return (
            <CardScreen
              loading={loading}
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
                  <div
                    className={`${classes.avatarAction} pointer`}
                    onClick={() => setModalOpen(true)}
                  >
                    <CameraIcon />
                  </div>
                  <Avatar src={thumb} className={classes.avatar}></Avatar>
                </div>
              </div>

              <StyledForm className={classes.formControl}>
                {fields.map((field, key) => {
                  const fieldValue = get(form.values, field.name)
                  return (
                    <TextField
                      form={form}
                      {...field}
                      value={fieldValue}
                      key={key}
                      placeholder='profileeditform.field.placeholder'
                    />
                  )
                })}
              </StyledForm>
            </CardScreen>
          )
        }}
      />
    </>
  )
}

export default withStyles(useStyles)(injectIntl(EditProfile))
