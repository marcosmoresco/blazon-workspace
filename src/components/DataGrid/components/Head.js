import React from 'react'
import classNames from 'classnames'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Checkbox from '@components/Checkbox'

class Head extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {           
      disabled: props.disabled || false     
    }  
  }

  componentDidUpdate() {
    
    const { disabled } = this.state

    if(this.props.disabled !== disabled) {
      this.setState({disabled: this.props.disabled})
    }
  }

  render() {    

    const { 
      classes, 
      onSelectAllClick, 
      order, 
      orderBy, 
      selected, 
      rows, 
      onRequestSort, 
      columns, 
      expand, 
      selectable, 
      isFetching, 
      defaultMargin,   
    } = this.props
    const { disabled } = this.state
    
    const numSelected = (selected || []).length
    const rowCount = (rows || []).length
    const isChecked = () => {

      if(!rowCount) {
        return false
      }

      let isChecked = true
      rows.every((row) => {
        if((selected || []).indexOf(row.identifier) === -1) {
          isChecked = false
          return false
        }
        return true
      })

      return isChecked
    }    

    return (
      <TableHead>
        <TableRow>        
          {selectable ? 
          <TableCell 
            padding="checkbox"
            className={classNames({'Disabled': disabled, 'Default-margin': defaultMargin})}>
            <Checkbox 
              disabled={disabled}                     
              indeterminate={numSelected > 0 && numSelected < rowCount}
              value={isChecked()}
              checked={isChecked()}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell> : null}                     
          {columns.map((headCell) => (
            <TableCell
              key={headCell.field}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.field ? order : false}
              className={classNames({'Default-margin-no-checkbox': !selectable && defaultMargin})}
            >
              <TableSortLabel
                active={orderBy === headCell.field}
                direction={orderBy === headCell.field ? order : 'asc'}  
                hideSortIcon={isFetching || !headCell.sortable}            
                onClick={(event, property) => {
                  if(!isFetching && headCell.sortable) {
                    onRequestSort(event, headCell.field)
                  } else {
                    event.stopPropagation()
                    event.nativeEvent.stopImmediatePropagation()
                  }
                }}>
                {headCell.headerName}
                {orderBy === headCell.field ? (
                  <span className={classes.visuallyHidden}></span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          {expand ? <TableCell padding="default"></TableCell> : null} 
        </TableRow>
      </TableHead>
    )
  }
}

export default Head