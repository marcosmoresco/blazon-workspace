import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'
import Button from '@components/Button'
import CardScreen from '@components/CardScreen'
import User from '@icons/User'
import DataGrid from '@components/DataGrid'
import useMockRequest from '@utils/mockRequest'
import Filter from '@components/Filter'
import useStyles from './styles'
import { withStyles } from '@material-ui/core/styles'

const mockData = [
  {
    resource: 'sint et',
    entitlement: 'non dolor velit enim sit',
    accountIdentifier: 'id consectetur'
  },
  {
    resource: 'ea esse ullamco mollit',
    entitlement: 'in consequat reprehenderit aute',
    accountIdentifier: 'quis officia eiusmod ex irure'
  },
  {
    resource: 'magna deserunt est esse',
    entitlement: 'ut',
    accountIdentifier: 'veniam'
  },
  {
    resource: 'Lorem',
    entitlement: 'occaecat proident dolor',
    accountIdentifier: 'laborum in magna'
  },
  {
    resource: 'qui aliquip nulla',
    entitlement: 'elit',
    accountIdentifier: 'do dolor consequat laborum'
  }
]

const columns = () => [
  {
    field: 'resource',
    headerName: <FormattedMessage id='resource' />,
    sortable: false
  },
  {
    field: 'entitlement',
    headerName: <FormattedMessage id='entitlement' />,
    sortable: false
  },
  {
    field: 'accountIdentifier',
    headerName: <FormattedMessage id='accountIdentifier' />,
    sortable: false
  }
]

const filters = [
  {
    name: 'entitlement',
    label: <FormattedMessage id='entitlement' />,
    type: 'string'
  },
  {
    name: 'entitlement',
    label: <FormattedMessage id='entitlement' />,
    type: 'string'
  },
  {
    name: 'accountIdentifier',
    label: <FormattedMessage id='accountIdentifier' />,
    type: 'string'
  }
]

const Entitlement = ({ classes }) => {
  const router = useRouter()
  const { loading, data: gridData } = useMockRequest(mockData, 500)

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
      <div className='Default-header-filter'>
        <Filter
          filters={filters}
          onChange={(filters: any) => search(filters)}
        />
        <div className='Card-actions'>
          <Button color='primary' variant='contained'>
            <FormattedMessage id={`profile.accounts.entitlements`} />
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
          handleClick={() => {}}
        />
      </div>
    </CardScreen>
  )
}

export default withStyles(useStyles)(Entitlement)
