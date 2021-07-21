import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import Button from '@components/Button'
import * as Yup from 'yup'
import CardScreen from '@components/CardScreen'
import User from '@icons/User'
import DataGrid from '@components/DataGrid'
import useMockRequest from '@utils/mockRequest'
import Filter from '@components/Filter'
import useStyles from './styles'
import { withStyles } from '@material-ui/core/styles'
import ShareIcon from '@icons/Share'
import { useFormikContext, withFormik } from 'formik'
import Dialog from '@components/Dialog'
import DatePicker from '@components/DatePicker'
import TextField from '@components/TextField'

const mockData = [
  {
    resource: 'anim',
    account: 'amet nisi officia ea',
    accountIdentifier: 'qui tempor dolore',
    createdAt: 'aliqua ut',
    status: 'enim tempor non Ut'
  },
  {
    resource: 'dolore cupidatat',
    account: 'amet enim consectetur sit',
    accountIdentifier: 'Duis dolor laborum adipisicing voluptate',
    createdAt: 'Excepteur',
    status: 'cillum voluptate'
  },
  {
    resource: 'dolor aliqua magna mollit',
    account: 'proident enim esse consectetur',
    accountIdentifier: 'commodo exercitation esse amet et',
    createdAt: 'incididunt amet',
    status: 'sint in esse'
  },
  {
    resource: 'cillum reprehenderit quis ut enim',
    account: 'ullamco Ut',
    accountIdentifier: 'labore',
    createdAt: 'Excepteur',
    status: 'ut'
  },
  {
    resource: 'in nostrud pariatur do enim',
    account: 'sunt laboris sint mollit in',
    accountIdentifier: 'qui mollit',
    createdAt: 'nostrud id ex est exercitation',
    status: 'culpa veniam Ut non'
  }
]

const columns = ({ classes }) => [
  {
    field: 'resource',
    headerName: <FormattedMessage id='resource' />,
    sortable: false
  },
  {
    field: 'account',
    headerName: <FormattedMessage id='account' />,
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

const filters = [
  {
    name: 'resource',
    label: <FormattedMessage id='resource' />,
    type: 'string'
  },
  {
    name: 'account',
    label: <FormattedMessage id='account' />,
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

const validationSchema = Yup.object({
  administrativeDialog: Yup.object({
    effectiveDate: Yup.string().required('requiredField'),
    justification: Yup.string().required('requiredField')
  })
})

const formik = {
  initialValues: {
    administrativeDialog: {
      effectiveDate: undefined,
      justification: ''
    }
  },
  validationSchema,
  onSubmit: (values: any) => {
    alert(JSON.stringify(values, null, 2))
  },
  enableReinitialize: true
}

const AdministrativeDialog = () => {
  const form = useFormikContext()
  const intl = useIntl()
  return (
    <div className='modal'>
      <div className='modal-section'>
        {intl.formatMessage({ id: 'administrativedialog.dialog.title' })}
      </div>
      <div className='modal-description'>
        {intl.formatMessage({ id: 'administrativedialog.dialog.description' })}
      </div>
      <div className='pt48'></div>
      <DatePicker
        label={intl.formatMessage({
          id: 'administrativedialog.dialog.effectiveDate'
        })}
        name='administrativeDialog.effectiveDate'
        onChange={(value) => {
          form.setFieldValue('administrativeDialog.effectiveDate', value)
        }}
      />
      <div className='pt22'></div>
      <TextField
        form={form}
        name='administrativeDialog.justification'
        multiline
        rows={3}
        rowsMax={4}
      />
    </div>
  )
}

const Administrative = ({ classes }) => {
  const router = useRouter()
  const intl = useIntl()
  const form = useFormikContext()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [currentSelected, setCurrentSelected] = useState<any>(undefined)
  const { loading, data: gridData } = useMockRequest(mockData, 500)

  const handleClickRow = (row: any) => {
    setModalOpen(true)
    setCurrentSelected(row)
  }

  const search = (filters?: any) => {
    console.log(filters)
  }

  return (
    <CardScreen
      loading={loading}
      title='profile'
      icon={<User height={24} width={24} />}
      onBack={() => router.push('/profile')}
    >
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={intl.formatMessage({ id: 'profile.accounts.adminstrative' })}
        onSave={() => {
          form.submitForm()
          console.log(form.values)
        }}
        isValid={form.isValid}
      >
        <AdministrativeDialog current={currentSelected} />
      </Dialog>
      <div className='Default-header-filter'>
        <Filter
          filters={filters}
          onChange={(filters: any) => search(filters)}
        />
        <div className='Card-actions'>
          <Button color='primary' variant='contained'>
            <FormattedMessage id={`profile.accounts.temporary`} />
          </Button>
        </div>
      </div>
      <div>
        <DataGrid
          height={600}
          list={gridData}
          links={[]}
          columns={columns({ classes })}
          page={1}
          size={25}
          rowsPerPageList={[25, 50, 75, 100]}
          handleClick={handleClickRow}
        />
      </div>
    </CardScreen>
  )
}

export default withStyles(useStyles)(withFormik(formik)(Administrative))
