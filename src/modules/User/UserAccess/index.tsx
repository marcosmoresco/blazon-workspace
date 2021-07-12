import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl'
import useStyles from './styles'
import CardScreen from '@components/CardScreen'
import User from '@icons/User'
import { useRouter } from 'next/router'
import DataGrid from '@components/DataGrid'
import Button from '@components/Button'
import { FilterType } from '@components/Filter/types'
import Filter from '@components/Filter'

type UserAccessScreenProps = {
  intl: IntlShape
  classes: any
  type: string
}

const UserAccess: FC<UserAccessScreenProps> = ({ classes, intl, type }) => {
  const router = useRouter()

  const entitlements = [
    {
      identifier: 1,
      name: 'Teste 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero.'
    },
    {
      identifier: 2,
      name: 'Teste 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero.'
    },
    {
      identifier: 3,
      name: 'Teste 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero.'
    },
    {
      identifier: 4,
      name: 'Teste 4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero.'
    },
    {
      identifier: 5,
      name: 'Teste 5',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis libero.'
    }
  ]

  const columns = [
    {
      field: 'name',
      headerName: <FormattedMessage id='name' />,
      sortable: false
    },
    {
      field: 'description',
      headerName: <FormattedMessage id='description' />,
      sortable: false
    }
  ]

  const filters: FilterType[] = [
    {
      name: 'identifier',
      label: <FormattedMessage id='identifier' />,
      type: 'number'
    },
    {
      name: 'name',
      label: <FormattedMessage id='name' />,
      type: 'string'
    }
  ]
  const search = (filters?: any) => {
    console.log(filters)
    // setIsFetching(true)
    // setTimeout(() => {
    //   setIsFetching(false)
    // }, 4000)
  }

  return (
    <CardScreen
      title='profile'
      icon={<User height={24} width={24} />}
      onBack={() => router.push('/profile')}
    >
      {' '}
      <div className='Default-header-filter'>
        <Filter
          filters={filters}
          onChange={(filters: any) => search(filters)}
        />
        <div className='Card-actions'>
          <Button color='primary' variant='contained'>
            <FormattedMessage id={`profile.accounts.${type}`} />
          </Button>
        </div>
      </div>
      <div>
        <DataGrid
          height={600}
          list={entitlements}
          links={[]}
          // fetching={isFetching}
          columns={columns}
          page={1}
          size={25}
          rowsPerPageList={[25, 50, 75, 100]}
          //handleClick={handleClickRow}
          // handleSelected={handleSelected}
          // actions={actions}
          selectable
        />
      </div>
    </CardScreen>
  )
}

export default withStyles(useStyles)(injectIntl(UserAccess))
