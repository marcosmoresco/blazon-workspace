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
    resource: 'deserunt Ut sunt irure sit',
    accountIdentifier: 'aute id dolore',
    createdAt: 'ut Lorem',
    expireAt: 'pariatur id tempor ut',
    status: 'nisi mollit eiusmod cillum dolore'
  },
  {
    resource: 'dolor ad sed',
    accountIdentifier: 'do',
    createdAt: 'aliquip elit ea et labore',
    expireAt: 'non ut aute quis',
    status: 'culpa magna'
  },
  {
    resource: 'id ullamco deserunt qui sit',
    accountIdentifier: 'fugiat occaecat velit adipisicing',
    createdAt: 'veniam nostrud cupidatat sunt esse',
    expireAt: 'irure',
    status: 'elit ut deserunt sit Excepteur'
  },
  {
    resource: 'deserunt commodo',
    accountIdentifier: 'irure ut amet fugiat ex',
    createdAt: 'irure ullamco cupidatat aliqua dolore',
    expireAt: 'in esse',
    status: 'aliqua'
  },
  {
    resource: 'Duis',
    accountIdentifier: 'Lorem',
    createdAt: 'consectetur eu magna in nisi',
    expireAt: 'anim irure',
    status: 'consequat'
  }
]

const columns = () => [
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
    field: 'expireAt',
    headerName: <FormattedMessage id='expireAt' />,
    sortable: false
  },
  {
    field: 'status',
    headerName: <FormattedMessage id='status' />,
    sortable: false
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
    name: 'expireAt',
    label: <FormattedMessage id='expireAt' />,
    type: 'date'
  },
  {
    name: 'status',
    label: <FormattedMessage id='status' />,
    type: 'string'
  }
]

const Temporary = ({ classes }) => {
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
          handleClick={() => {}}
        />
      </div>
    </CardScreen>
  )
}

export default withStyles(useStyles)(Temporary)
