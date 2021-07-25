import React, { useEffect } from 'react'
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

function Row(props) {
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
    expandAll,   
    noHover,  
    expanded,   
    handleExpand
  } = props
  const [open, setOpen] = React.useState(expanded.indexOf(props.row.id) > -1 || false)
  const [disabled, setDisabled] = React.useState(props.disabled || false) 
  const [row, setRow] = React.useState(props.row)
  const [expandedAll, setExpandedAll] = React.useState(expandAll)

  useEffect(() => {   
    if(expandAll !== null && expandAll !== undefined && expandAll !== expandedAll) {
      if(expandAll) {
        if(beforeExpand) {
          beforeExpand(row, (newRow) => {
            setRow(newRow)
            setOpen(expandAll)  
            handleExpand(row, expandAll)  
            setExpandedAll(expandAll)      
          })
        } else {
          setOpen(expandAll)
          setRow(props.row)        
          handleExpand(row, expandAll) 
          setExpandedAll(expandAll)
        }      
      } else {
        if(open !== expandAll) {
          setRow(props.row) 
          setOpen(expandAll)     
          handleExpand(row, expandAll) 
          setExpandedAll(expandAll)
        }     
      } 
      setDisabled(props.disabled)    
    } else if(row.id !== props.row.id) {
      setRow(props.row)
    }                
  }, [expandAll, beforeExpand, handleExpand, expandedAll, row, open, props])

  const onExpand = (isOpen) => {

    if(isOpen) {
      if(beforeExpand) {
        beforeExpand(row, () => {
          setOpen(isOpen)  
          handleExpand(row, isOpen)                          
        })
      } else {
        setOpen(isOpen)        
        handleExpand(row, isOpen)  
      }      
    } else {
      setOpen(isOpen)      
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
          className={classNames({'Disabled': disabled, 'Default-margin': props.defaultMargin})}>
          <Checkbox
            disabled={disabled}
            checked={isSelected}
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={(event) => handleSelectedClick(event, row.id, row)}
          />
        </TableCell> : null}        
         
        {columns.map((column, index) => {                   
          return (
          <TableCell 
            key={column.field} align="left"
            className={classNames({'Default-margin-no-checkbox': !selectable && props.defaultMargin})}>
            <div className="flex">
              {index === 0 && sortable ? <DragHandle/> : null}
              {column.renderCell ? column.renderCell(row) : (row[column.field] || ' - ')}
            </div>
          </TableCell>)
        })}  

        {expand ?            
        (<TableCell className="Expanded-row">
          <IconButton aria-label="expand row" size="small" onClick={(e) => { e.stopPropagation(); setOpen(!open)}}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>) : null}
                           
      </TableRow>
          
      {expand ?    
      (<TableRow className={classNames({'Expanded-row-content': true, 'Expanded': open})}>
        <TableCell colSpan={colspan}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {open ? expand(row) : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>) : null}

    </React.Fragment>
  );
}

export default Row;