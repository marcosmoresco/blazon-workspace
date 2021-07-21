import React, { useState } from 'react'
import ShareIcon from '@icons/Share'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import Button from '@components/Button'
import CardScreen from '@components/CardScreen'
import User from '@icons/User'
import Dialog from '@components/Dialog'
import DataGrid from '@components/DataGrid'
import useMockRequest from '@utils/mockRequest'
import Filter from '@components/Filter'
import { Form, Formik, useFormikContext } from 'formik'
import useStyles from './styles'
import { withStyles } from '@material-ui/core/styles'
import Loading from '@components/Loading'
import NotebookIcon from '@icons/Notebook'
import Grid from '@material-ui/core/Grid'
import TextField from '@components/TextField'
import Divider from '@components/Divider'
import MagnifyingGlassIcon from '@icons/MagnifyingGlass'
import Checkbox from '@components/Checkbox'
import { Beneficiary } from '@modules/Requests/components/constants'

const mockData = [
  {
    resource: 'sint',
    accountIdentifier: 'irure occaecat est dolore',
    createdAt: 'dolore Ut sit',
    status: 'cillum nostrud deserunt'
  },
  {
    resource: 'Ut elit eu et',
    accountIdentifier: 'sunt ipsum non',
    createdAt: 'et do officia minim sint',
    status: 'mollit in dolor commodo Excepteur'
  },
  {
    resource: 'sunt aliqua in',
    accountIdentifier: 'Excepteur sed',
    createdAt: 'quis culpa velit et sint',
    status: 'Duis est Ut ipsum elit'
  },
  {
    resource: 'sint ut officia Ut',
    accountIdentifier: 'tempor occaecat aliquip nulla nisi',
    createdAt: 'aliquip in qui',
    status: 'dolor magna'
  },
  {
    resource: 'sunt veniam Ut velit esse',
    accountIdentifier: 'anim',
    createdAt: 'laborum Lorem dolore',
    status: 'aliqua aliquip do laboris ut'
  }
]

const filters = [
  {
    name: 'resource',
    label: <FormattedMessage id='resource' />,
    type: 'string'
  },
  {
    name: 'accountIdentifier',
    label: <FormattedMessage id='accountIdentifier' />,
    type: 'string'
  },
  {
    name: 'createdAt',
    label: <FormattedMessage id='createdAt' />,
    type: 'date'
  },
  {
    name: 'status',
    label: <FormattedMessage id='status' />,
    type: 'string'
  }
]

const columns = ({ classes }) => [
  {
    field: 'resource',
    headerName: <FormattedMessage id='resource' />,
    sortable: false
  },
  {
    field: 'accountIdentifier',
    headerName: <FormattedMessage id='accountIdentifier' />,
    sortable: false
  },
  {
    field: 'createdAt',
    headerName: <FormattedMessage id='createdAt' />,
    sortable: false
  },
  {
    field: 'status',
    headerName: <FormattedMessage id='status' />,
    sortable: false
  },
  {
    field: 'action',
    headerName: <FormattedMessage id='actions' />,
    sortable: false,
    renderCell: () => {
      return (
        <div className={classes.actionIcon}>
          <ShareIcon height={28} width={28} />
        </div>
      )
    }
  }
]

const mockSharedDialog = [
  {
    user: 'Eduardo Cesario dos Santos',
    thumb: '/Avatar.svg',
    read: false,
    write: true,
    share: false
  },
  {
    user: 'Eduardo Cesario dos Santos',
    thumb: '/Avatar.svg',
    read: false,
    write: true,
    share: false
  },
  {
    user: 'Eduardo Cesario dos Santos',
    thumb: '/Avatar.svg',
    read: false,
    write: true,
    share: false
  }
]

const SharedDialogContent = ({ current, classes }) => {
  const intl = useIntl()
  const { resource, accountIdentifier, createdAt, status } = current
  const form = useFormikContext()

  return (
    <Form>
      <Grid container className={classes.dialogIconDetail}>
        <Grid item className='iconBg'>
          <div className='iconCell'>
            <NotebookIcon height={42} width={42} />
          </div>
        </Grid>
        <Grid item className='detailContent'>
          <div className='title'>{resource}</div>
          <div className='description'>{accountIdentifier}</div>
        </Grid>
      </Grid>
      <Grid className={classes.searchSection}>
        <div className='title'>
          {intl.formatMessage({ id: 'shareddialog.information' })}
        </div>
        <TextField
          startAdornment={<MagnifyingGlassIcon />}
          form={form}
          name='shareddialog.searchField'
          hideLabel={true}
        />
      </Grid>
      <Divider className={classes.divider} />
      <DataGrid
        links={[]}
        page={1}
        size={25}
        rowsPerPageList={[25, 50, 75, 100]}
        list={form.values.shareddialog.permissions}
        columns={[
          {
            field: 'user',
            headerName: <FormattedMessage id='shareddialog.grid.user' />,
            sortable: false,
            renderCell: (row: any) => {
              return row?.user ? (
                <Beneficiary name={row?.user} image={row?.thumb} />
              ) : (
                ' - '
              )
            }
          },
          {
            field: 'read',
            headerName: <FormattedMessage id='shareddialog.grid.read' />,
            sortable: false,
            renderCell: (row: any) => {
              return (
                <>
                  <Checkbox
                    value={form.values.shareddialog.permissions[row.index].read}
                    onChange={(value) => {
                      form.setFieldValue(
                        `shareddialog.permissions[${row.index}].read`,
                        value
                      )
                    }}
                  />
                </>
              )
            }
          },
          {
            field: 'write',
            headerName: <FormattedMessage id='shareddialog.grid.write' />,
            sortable: false,
            renderCell: (row: any) => {
              return (
                <>
                  <Checkbox
                    value={
                      form.values.shareddialog.permissions[row.index].write
                    }
                    onChange={(value) => {
                      form.setFieldValue(
                        `shareddialog.permissions[${row.index}].write`,
                        value
                      )
                    }}
                  />
                </>
              )
            }
          },
          {
            field: 'share',
            headerName: <FormattedMessage id='shareddialog.grid.share' />,
            sortable: false,
            renderCell: (row: any) => {
              return (
                <>
                  <Checkbox
                    value={
                      form.values.shareddialog.permissions[row.index].share
                    }
                    onChange={(value) => {
                      form.setFieldValue(
                        `shareddialog.permissions[${row.index}].share`,
                        value
                      )
                    }}
                  />
                </>
              )
            }
          }
        ]}
      />
    </Form>
  )
}

const ShareDialog = ({ modalOpen, setModalOpen, currentSelected, classes }) => {
  const intl = useIntl()
  const { loading, data: permissionsWithoutIndex } = useMockRequest(
    mockSharedDialog,
    500
  )
  const permissions = permissionsWithoutIndex?.map?.((a, index) => {
    return { ...a, index }
  })

  if (loading) {
    return <Loading type='blue' container={true} />
  }

  const formik = {
    initialValues: {
      shareddialog: {
        current: currentSelected,
        permissions
      }
    },
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2))
    },
    enableReinitialize: true
  }

  return (
    <Formik
      {...formik}
      render={(form) => (
        <Dialog
          open={modalOpen}
          title={intl.formatMessage({ id: 'profile.accounts.shared' })}
          onClose={() => setModalOpen(false)}
          onSave={() => {
            console.log(form.values)
            setModalOpen(false)
          }}
          isValid={true}
        >
          <SharedDialogContent current={currentSelected} classes={classes} />
        </Dialog>
      )}
    />
  )
}

const Shared = ({ classes }) => {
  const intl = useIntl()
  const router = useRouter()
  const screen = {}
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [currentSelected, setCurrentSelected] = useState<any>(undefined)
  const { loading, data: gridData } = useMockRequest(mockData, 500)
  const search = (filters?: any) => {
    console.log(filters)
  }

  const handleClickRow = (row: any) => {
    setModalOpen(true)
    setCurrentSelected(row)
  }

  const onSave = () => {
    setModalOpen(false)
  }

  return (
    <CardScreen
      loading={loading}
      title='profile'
      icon={<User height={24} width={24} />}
      onBack={() => router.push('/profile')}
    >
      <ShareDialog
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentSelected={currentSelected}
        classes={classes}
      />
      <div className='Default-header-filter'>
        <Filter
          filters={filters}
          onChange={(filters: any) => search(filters)}
        />
        <div className='Card-actions'>
          <Button color='primary' variant='contained'>
            <FormattedMessage id={`profile.accounts.shared`} />
          </Button>
        </div>
      </div>
      <div>
        <DataGrid
          height={600}
          list={gridData}
          links={[]}
          // fetching={isFetching}
          columns={columns({ classes })}
          page={1}
          size={25}
          rowsPerPageList={[25, 50, 75, 100]}
          handleClick={handleClickRow}
          // handleSelected={handleSelected}
        />
      </div>
    </CardScreen>
  )
}

export default withStyles(useStyles)(Shared)
