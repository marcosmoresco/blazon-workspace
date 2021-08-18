import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Dialog from '@components/Dialog'
import DataGrid from '@components/DataGrid'
import useMockRequest from '@utils/mockRequest'
import { Form, Formik, useFormikContext } from 'formik'
import Loading from '@components/Loading'
import NotebookIcon from '@icons/Notebook'
import Grid from '@material-ui/core/Grid'
import TextField from '@components/TextField'
import Divider from '@components/Divider'
import MagnifyingGlassIcon from '@icons/MagnifyingGlass'
import Checkbox from '@components/Checkbox'
import { Beneficiary } from '@modules/Requests/components/constants'
import mockSharedDialog from './Shared'
import { withStyles } from '@material-ui/core'
import { useStyles } from './styles'

const SharedDialogContent = ({ current, classes }) => {
  const intl = useIntl()
  const { resource, accountIdentifier, name, description } = current
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
          <div className='title'>{resource || name}</div>
          <div className='description'>{accountIdentifier || description}</div>
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

export default withStyles(useStyles)(ShareDialog)
