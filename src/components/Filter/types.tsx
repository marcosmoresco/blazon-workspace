import { IntlShape } from 'react-intl'

export type FilterType = {
  $promise?: any
  values?: any
  name: string
  label: any
  value?: any
  defaultValue?: any
  type: string
  list?: any
  bind?: any
  view?: any
  bindValue?: any
  formatValue?: any
  startAdornment?: any
  renderOption?: any
  async?: any
}

export type FilterPropsType = { 
  intl: IntlShape
  onChange: any
  isLoading?: boolean
  type?: string
  filters: FilterType[]
  dispatch: any
  classes: {
    root: string
    filterContainer: string
    input: string
    inputFilterIcon: string
    content: string
    title: string
    chipsContent: string
    addedFilter: string   
  }
}

export type FilterStateType = { 
  open: boolean
  selectedIndex?: number
  selectedFilter?: FilterType
  filterText: string
  filtered: string[]
  filters: FilterType[]
}