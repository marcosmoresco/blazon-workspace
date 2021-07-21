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
    name: 'Teste 1'
  },
  {
    name: 'Teste 2'
  },
  {
    name: 'Teste 3'
  },
  {
    name: 'Teste 4'
  },
  {
    name: 'Teste 5'
  }
]

const columns = () => [
  {
    field: 'name',
    headerName: <FormattedMessage id='name' />,
    sortable: false
  }
]

const filters = [
  {
    name: 'name',
    label: <FormattedMessage id='name' />,
    type: 'string'
  }
]

const Roles = ({ classes }) => {
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
            <FormattedMessage id={`profile.accounts.roles`} />
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

export default withStyles(useStyles)(Roles)
