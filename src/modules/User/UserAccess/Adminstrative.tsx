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
import { useStyles } from './styles'
import { withStyles } from '@material-ui/core/styles'
import ShareIcon from '@icons/Share'
import { useFormikContext, withFormik } from 'formik'
import Dialog from '@components/Dialog'
import DatePicker from '@components/DatePicker'
import TextField from '@components/TextField'
import { GET_USER_ACCOUNTS } from "@modules/User/queries";

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
    name: "resourceName",
    label: <FormattedMessage id="resource" />,
    type: "text",
  },
  {
    name: "accountIdentifier",
    label: <FormattedMessage id="accountIdentifier" />,
    type: "text",
  },
  {
    name: "status",
    label: <FormattedMessage id="status" />,
    type: "list",
    values: [
      {
        label: <FormattedMessage id="active" />,
        value: "ACTIVE",
      },
      {
        label: <FormattedMessage id="revoked" />,
        value: "REVOKED",
      },
    ],
    bind: "value",
    view: "label",
  },
  {
    name: "createdAt",
    label: <FormattedMessage id="createdAt" />,
    type: "date",
  },
];

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

  const [queryFilters, setQueryFilters] = useState({
    page: 0,
    size: 100,
    filters: JSON.stringify({
      resourceType: "ADMIN",
    })
  });

  const search = (filters?: any) => {
    setQueryFilters({
      page: 0,
      size: 100,
      filters: JSON.stringify({
        resourceType: "ADMIN",
        ...filters
      }),
    });
  };

  const handleClickRow = (row: any) => {
    setModalOpen(true)
    setCurrentSelected(row)
  }  

  return (
    <CardScreen
      loading={false}
      title='profile'
      subTitle="profile.accounts.adminstrative"
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
      </div>
      <div>
        <DataGrid
          query={GET_USER_ACCOUNTS}
          queryFilters={queryFilters}
          getResponseLinks={(data: any) => data?.getUserAccounts?.links}
          getResponse={(data: any) => data?.getUserAccounts?.accounts}
          height={600}         
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
