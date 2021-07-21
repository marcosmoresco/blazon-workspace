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

const validationSchema = Yup.object({
  applicationDialog: Yup.object({
    effectiveDate: Yup.string().required('requiredField'),
    justification: Yup.string().required('requiredField')
  })
})

const formik = {
  initialValues: {
    applicationDialog: {
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

const ApplicationDialog = () => {
  const form = useFormikContext()
  const intl = useIntl()
  return (
    <div className='modal'>
      <div className='modal-section'>
        {intl.formatMessage({ id: 'applicationdialog.dialog.title' })}
      </div>
      <div className='modal-description'>
        {intl.formatMessage({ id: 'applicationdialog.dialog.description' })}
      </div>
      <div className='pt48'></div>
      <DatePicker
        label={intl.formatMessage({
          id: 'applicationdialog.dialog.effectiveDate'
        })}
        name='applicationDialog.effectiveDate'
        onChange={(value) => {
          form.setFieldValue('applicationDialog.effectiveDate', value)
        }}
      />
      <div className='pt22'></div>
      <TextField
        form={form}
        name='applicationDialog.justification'
        multiline
        rows={3}
        rowsMax={4}
      />
    </div>
  )
}

const Application = ({ classes }) => {
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
        title={intl.formatMessage({ id: 'profile.accounts.application' })}
        onSave={() => {
          form.submitForm()
          console.log(form.values)
        }}
        isValid={form.isValid}
      >
        <ApplicationDialog current={currentSelected} />
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

export default withStyles(useStyles)(withFormik(formik)(Application))
