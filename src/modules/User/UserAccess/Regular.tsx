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
    name: 'status',
    label: <FormattedMessage id='status' />,
    type: 'string'
  }
]

const Regular = ({ classes }) => {
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
            <FormattedMessage id={`profile.accounts.regular`} />
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

export default withStyles(useStyles)(Regular)
