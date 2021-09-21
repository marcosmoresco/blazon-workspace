import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import Button from '@components/Button'
import * as Yup from 'yup'
import CardScreen from '@components/CardScreen'
import Tooltip from '@components/Tooltip'
import User from '@icons/User'
import DataGrid from '@components/DataGrid'
import useMockRequest from '@utils/mockRequest'
import Filter from '@components/Filter'
import { useStyles } from './styles'
import { withStyles } from '@material-ui/core/styles'
import SharedAccountIcon from "@icons/SharedAccount";
import { useFormikContext, withFormik } from 'formik'
import Dialog from '@components/Dialog'
import DatePicker from '@components/DatePicker'
import TextField from '@components/TextField'
import { addMessage } from "@actions/index";
import { GET_USER_ACCOUNTS } from "@modules/User/queries";
import { REQUEST_CREDENTIALS_USER_APPLICATION_ACCOUNT } from "@modules/User/mutations";
import { TitleHierarchy } from "@components/TitlePage/types";
import EmptyStateApplicationImage from "@images/EmptyStateApplicationAccount.svg";

const columns = ({ classes }) => [
  {
    field: "resourceName",
    headerName: <FormattedMessage id="resource" />,
    sortable: false,
  },
  {
    field: "accountIdentifier",
    headerName: <FormattedMessage id="accountIdentifier" />,
    sortable: false,
  },
  {
    field: "createdAt",
    headerName: <FormattedMessage id="createdAt" />,
    sortable: false,
  },
  {
    field: "status",
    headerName: <FormattedMessage id="status" />,
    sortable: false,
  },
  {
    field: 'action',
    headerName: <FormattedMessage id='actions' />,
    sortable: false,
    renderCell: () => {
      return (
        <Tooltip title={<FormattedMessage id="applicationdialog.dialog.title" />} placement="bottom">
          <div className={classes.actionIcon}>
            <SharedAccountIcon height={28} width={28} />
          </div>
        </Tooltip>       
      );
    },    
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
        label: <FormattedMessage id="inactive" />,
        value: "INACTIVE",
      },
    ],
    bind: "value",
    view: "label",
  }, 
];

const validationSchema = Yup.object({
  applicationDialog: Yup.object({
    effectiveDate: Yup.string(),
    justification: Yup.string().required(<FormattedMessage id="applicationdialog.justification.required" />)
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
  enableReinitialize: true,
  isInitialValid: false
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
  const dispatch = useDispatch();
  const intl = useIntl()
  const form = useFormikContext()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [currentSelected, setCurrentSelected] = useState<any>(undefined)
  
  const [queryFilters, setQueryFilters] = useState({
    page: 0,
    size: 100,
    filters: JSON.stringify({
      resourceType: "APPLICATION",
    })
  });

  const search = (filters?: any) => {
    setQueryFilters({
      page: 0,
      size: 100,
      filters: JSON.stringify({
        resourceType: "APPLICATION",
        ...filters
      }),
    });
  };

  const handleClickRow = (row: any) => {
    setModalOpen(true)
    setCurrentSelected(row)
  }

  const [credentialsUserApplicationAccount, {}] = useMutation(REQUEST_CREDENTIALS_USER_APPLICATION_ACCOUNT, {    
    onCompleted: ({credentialsUserApplicationAccount}) => {   
      if(credentialsUserApplicationAccount) {
        dispatch(
          addMessage(
            <FormattedMessage id="profile.accounts.application.requestCredentials.success" />
          )
        );
        form.resetForm();
        setModalOpen(false);
      }        
    },
  });

  const hierarchy: TitleHierarchy = {
    name: "profile.header.breadcrumb",
    href: "/profile",
    children: [
      {
        name: "profile.accounts",
      },
    ],
  };

  return (
    <CardScreen
      loading={false}
      title='profile.accounts.application'                 
      onBack={() => router.push('/profile')}
      hierarchy={hierarchy}
    >
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={intl.formatMessage({ id: 'profile.accounts.application' })}
        onSave={() => {         
          credentialsUserApplicationAccount({
            variables: {
              accountId: Number(currentSelected?.identifier),
              ...form?.values?.applicationDialog
            },
          });
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
      </div>
      <div>
        <DataGrid
          emptyStateImage={EmptyStateApplicationImage}
          query={GET_USER_ACCOUNTS}
          queryFilters={queryFilters}
          getResponseLinks={(data: any) => data?.getUserAccounts?.links}
          getResponse={(data: any) => data?.getUserAccounts?.accounts}
          height={600}          
          columns={columns({ classes })}
          page={0}
          size={100}
          handleClick={handleClickRow}
          type="pagination"
        />
      </div>
    </CardScreen>
  )
}

export default withStyles(useStyles)(withFormik(formik)(Application))
