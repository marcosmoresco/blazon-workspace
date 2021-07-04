import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'
import type {FilterType} from '@components/Filter/types'

export const columns = [
  { field: 'identifier', headerName: <FormattedMessage id="identifier"/>, sortable: true },
  { field: 'name', headerName: <FormattedMessage id="name"/>, sortable: false },
  { field: 'status', headerName: <FormattedMessage id="status"/>, sortable: false },
  { field: 'date', headerName: <FormattedMessage id="date"/>, sortable: false, renderCell: (row:any) =>{(row.date && format(row.date, 'dd/MM/yyyy HH:mm:ss')) || " - "}},
]

export const filters: FilterType[] = [{
  name: 'identifier',
  label: <FormattedMessage id="identifier"/>,
  type: 'number'
}, {
  name: 'status',
  label: <FormattedMessage id="status"/>,
  type: 'list',
  values: [{
    label: <FormattedMessage id="active"/>,
    value: 'ACTIVE'
  }, {
    label: <FormattedMessage id="inactive"/>,
    value: 'INACTIVE'
  }],
  bind: 'value',
  view: 'label' 
}, {
  name: 'date',
  label: <FormattedMessage id="date"/>,
  type: 'date',
  bind: {
    start: 'initDateAt',
    end: 'endDateAt'
  }
}]