import React from 'react'
import classNames from 'classnames'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Checkbox from '@components/Checkbox'
import { DragHandle } from './Sortable'

class Row extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {           
      open: false,
      disabled: false,
      row: props.row,
      expandedAll: false     
    }
  }  

  componentDidUpdate() {
    
    const { expanded, expandAll, beforeExpand, handleExpand } = this.props
    const { open, disabled, expandedAll, row } = this.state

    if(expanded.indexOf(this.props.row.id) > -1 && !open) {
      this.setState({open: true})
    }

    if(this.props.disabled !== disabled) {
      this.setState({disabled: this.props.disabled})
    }

    if (expandAll !== null && expandAll !== undefined && expandAll !== expandedAll) {
      if (expandAll) {
        if (beforeExpand) {
          beforeExpand(row, (newRow) => {
            this.setState({
              row: newRow,
              open: expandAll,
              expandedAll: expandAll
            })           
            handleExpand(row, expandAll)            
          })
        } else {
          this.setState({
            row: row,
            open: expandAll,
            expandedAll: expandAll
          })           
          handleExpand(row, expandAll)         
        }
      } else {
        if (open !== expandAll) {

          this.setState({
            row: row,
            open: expandAll,
            expandedAll: expandAll
          })           
          handleExpand(row, expandAll)          
        }
      }

      this.setState({
        row: row,
        open: expandAll,
        expandedAll: expandAll
      })        
    } else if (row.id !== this.props.row.id) {
      this.setState({
        row: this.props.row,
      })
    }
  }

  render() {

    const {
      columns,
      expand,
      beforeExpand,
      isSelected,
      labelId,
      colspan,
      handleSelectedClick,
      handleClick,
      selectable,
      sortable,
      noHover,
      handleExpand,
      defaultMargin
    } = this.props  
    
    const { 
      open,
      row,
      disabled 
    } = this.state

    const onExpand = (isOpen) => {

      if (isOpen) {
        if (beforeExpand) {
          beforeExpand(row, () => {
            this.setState({open: isOpen})           
            handleExpand(row, isOpen)
          })
        } else {
          this.setState({open: isOpen})         
          handleExpand(row, isOpen)
        }
      } else {
        this.setState({open: isOpen})       
        handleExpand(row, isOpen)
      }
    }

    return (
      <React.Fragment>
        <TableRow
          hover
          onClick={(event) => handleClick ? handleClick(row) : ((expand ? onExpand(!open) : selectable ? handleSelectedClick(event, row.id) : null))}
          role="checkbox"
          aria-checked={isSelected}
          tabIndex={-1}
          key={row.id}
          selected={isSelected}
          className={`${noHover ? "No-hover" : ""}`}
        >
          {selectable ?
            <TableCell
              padding="checkbox"
              className={classNames({ 'Disabled': disabled, 'Default-margin': defaultMargin })}>
              <Checkbox
                disabled={disabled}
                value={isSelected}
                inputProps={{ 'aria-labelledby': labelId }}
                onClick={(event) => handleSelectedClick(event, row.id, row)}
              />
            </TableCell> : null}

          {columns.map((column, index) => {
            return (
              <TableCell
                key={column.field} align="left"
                className={classNames({ 'Default-margin-no-checkbox': !selectable && defaultMargin })}>
                <div className="flex">
                  {index === 0 && sortable ? <DragHandle /> : null}
                  {column.renderCell ? column.renderCell(row) : (row[column.field] || ' - ')}
                </div>
              </TableCell>)
          })}

          {expand ?
            (<TableCell className="Expanded-row">
              <IconButton aria-label="expand row" size="small" onClick={(e) => { e.stopPropagation(); this.setState({open: !open})}}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>) : null}

        </TableRow>

        {expand ?
          (<TableRow className={classNames({ 'Expanded-row-content': true, 'Expanded': open })}>
            <TableCell colSpan={colspan}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  {open ? expand(row) : null}
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>) : null}

      </React.Fragment>
    )
  }
}

export default Row