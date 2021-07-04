import React, {useEffect} from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc'
import arrayMove from 'array-move'
//import InfiniteScroll from 'react-infinite-scroller'
//Grid
//import { XGrid } from '@material-ui/x-grid'
import { GridOverlay } from '@material-ui/data-grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '../Snackbar'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import gridCheckedIcon from './images/active.svg'
import gridNormalIcon from './images/normal.svg'
import orderIcon from './images/order.svg'
import empty from './images/empty.svg'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Checkbox from '@material-ui/core/Checkbox'
import { replaceQueryParam } from '../../utils/queryParam'
import { connect } from 'react-redux'
import axios from 'axios'

function customCheckbox(theme) {  
  return {
    '& .MuiCheckbox-root svg': {     
      backgroundImage: `url(${gridNormalIcon})`     
    },      
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundImage: `url(${gridCheckedIcon})`
    },
    '& .MuiCheckbox-root .MuiIconButton-label': {     
      marginLeft: 5     
    },  
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {     
      display: 'none'     
    },
    '& .MuiCheckbox-root.Mui-disabled': {
      cursor: 'default',
      opacity: 0.7,
      pointerEvents: 'none',
    } 
  }
}

const useStylesNoRows = makeStyles((theme) => ({
  root: {
    flexDirection: 'column'    
  },
  emptyGridContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  emptyGridInfo: {
    display: 'flex',
    alignItems: 'center',
    margin: '50px 0'
  }, 
  emptyGridTemplateLabel: {
    marginLeft: 14,
    maxWidth: 323,
  },
  emptyGridLabel: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,    
    color: '#26213F',
    width: 192,    
    lineHeight: '18px',
  }
}));

function CustomNoRowsOverlay(props) {

  const { isEmpty, template } = props  

  const classes = useStylesNoRows()

  const id = (isEmpty && 'app.no.results') || 'app.end.of.results'

  return (
    <GridOverlay className={classes.root}>
      <div className={classes.emptyGridContent}>
        <div className={classes.emptyGridInfo}>
          <img alt="Empty" src={empty} />
          <div className={classes.emptyGridTemplateLabel}>
            <div className={classes.emptyGridLabel}>
              <FormattedMessage id={id} />
            </div>
            {template}
          </div>          
        </div>                  
      </div>
    </GridOverlay>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',    
    '& .MuiDataGrid-root': {
      borderRadius: 0,
      border: 0,     
      '& .MuiDataGrid-columnsContainer': {        
        background: '#E5E5EA', 
        height: 42,
        minHeight: '0 !important',
        '& .MuiDataGrid-colCellWrapper': {
          height: 42,
        }
      },
      '& .MuiDataGrid-window': {
        top: '42px !important'
      },
      '& ::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px #9D9D9D',	      
	      backgroundColor: '#F5F5F5'
      },     
      '& ::-webkit-scrollbar': {
        width: 8,
        height: 8,
	      backgroundColor: '#F5F5F5'
      },      
      '& ::-webkit-scrollbar-thumb': {
        borderRadius: 10,
        '-webkit-box-shadow': 'inset 0 0 6px #9D9D9D',
        backgroundColor: '#9D9D9D'
      },
      '& .MuiDataGrid-row': {
        cursor: 'pointer'        
      }     
    },
    ...customCheckbox(theme),
  },  
  default: {
    background: '#F1F1FE',
    border: '1px solid #D4D3D9',
    borderRadius: 6,
    '& table': {
      '& tbody': {
        '& tr': {
          backgroundColor: '#F1F1FE'
        }
      }
    }    
  },
  loading: {
    position: 'absolute',    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  tablePagination: {

  },
  defaultButtonSelected: {
    height: 42,
    background: '#333335',
    borderRadius: 100,
    '& .MuiButton-label': {
      fontWeight: 600,
      fontSize: 16,   
      color: '#F1F1FE',
      opacity: 0.4,
      textTransform: 'initial'
    },
    '&:hover': {
      backgroundColor: '#333335'
    },
    '& img': {
      filter: 'invert(91%) sepia(8%) saturate(276%) hue-rotate(201deg) brightness(84%) contrast(180%)'
    }
  },
  buttonSelectedRed: {  
    borderRadius: 20,
    color: '#FFFFFF',   
    backgroundColor: '#FF134A',
    textTransform: 'initial',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#FF134A'
    },
    '& img': {
      filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(172deg) brightness(102%) contrast(180%)'
    }
  },
  buttonSelectedContent: {     
    '& span:not(:last-child) > button': {
      marginRight: 10         
    },
    '& .MuiButton-label': {
      marginLeft: 7,
      marginRight: 7
    }   
  },
  snackbar: {
    '& .MuiPaper-root': {
      background: '#232325',
      borderRadius: 38,
      height: 64,
      padding: '0 22px',
      width: 'max-content',
      '& .MuiSnackbarContent-message': {
        fontSize: 15,
        color: '#FCFCFC'
      }
    }    
  },
  emptyGridContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  emptyGridInfo: {
    display: 'flex',
    alignItems: 'center',
    margin: '50px 0'
  }, 
  emptyGridLabel: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,    
    color: '#777779',
    width: 192,
    marginLeft: 14
  },
  table: {
    width: '100%',    
    borderCollapse: 'collapse',  
    '& .MuiTableCell-paddingCheckbox': {
      padding: '0 0 0 4px',
      '&.Disabled': {
        cursor: 'default',
        opacity: 0.7,
        pointerEvents: 'none',
      }
    },  
    '& thead tr': {               
      height: 42,
      background: '#E5E5EA',       
      '& th' : {
        padding: '0 16px',
        maxHeight: 42,
        textAlign: 'initial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        color: '#232325',
        background: '#E9E8EB',
        '&.checkbox': {                
          width: 50,
          textAlign: 'end'
        },
        '&.Default-margin': {
          paddingLeft: '76px'
        },
        '&.Default-margin-no-checkbox': {
          paddingLeft: '92px'
        },
      },           
    },
    '& tbody tr': {
      borderBottom: '1px solid #C4C4C4',
      lineHeight: '55px',
      cursor: 'pointer',
      backgroundColor: '#FFFFFF',      
      '& td': {
        fontSize: '15px',
        color: '#232325',        
        '&.checkbox': {
          width: 50,
          textAlign: 'end'
        },
        '&.Default-margin': {
          paddingLeft: '76px'
        },
        '&.Default-margin-no-checkbox': {
          paddingLeft: '92px'
        },
      },
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      },
      '&.No-hover': {
        cursor: 'default',
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: 'transparent'
        },
      }
    },
    '& .sortable': {
      cursor: 'pointer'
    },
    '& .orderIcon': {
      position: 'relative',
      top: 5
    },
    '& .Drag-handle': {
      marginRight: 15,
      cursor: 'move'
    },
    '& .Expanded-row': {
      width: 30      
    },
    '& .Expanded-row-content': {  
      border: 0,       
      '& td': {
        paddingBottom: 0, 
        padding: 0,
        border: 0,   
        backgroundColor: '#E6EAEB',
        '& .MuiBox-root': {
          margin: 0
        }   
      },
      '&.Expanded-row-content.Expanded': {
        borderBottom: '3px solid #D0D0DC'  
      }       
    }   
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  paginationContent: {
    display: 'flex',
    margin: '20px',
    '& .pag-item': {
      marginRight: 10,
      fontSize: 15,
      color: '#232325',
      '& span': {        
        marginLeft: 5
      },
      '& img': {
        cursor: 'pointer'
      }
    }
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator, isDefault, filter, filterOptions) {
  const stabilizedThis = array.map((el, index) => [el, index])
  
  let result = stabilizedThis.map((el) => el[0]) 

  if(filter) {
    result = result.filter((i) => {     

      let res = false

      Object.keys(i).every((key) => {              

        if(("" + i[key]).toUpperCase().indexOf(filter.toUpperCase()) > -1) {            
          if(filterOptions) {
            if(filterOptions.indexOf(key) > -1) {
              res = true 
              return false
            }               
          } else {
            if(key !== "identifier") {
              res = true   
              return false
            } 
          }                  
        }

        return true
      })

      return res
    })   
  }

  return result
}

function EnhancedTableHead(props) {
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
  } = props
  
  const [disabled, setDisabled] = React.useState(props.disabled || false) 
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

  useEffect(() => {
    setDisabled(props.disabled)
  }, [props])

  return (
    <TableHead>
      <TableRow>        
        {selectable ? 
        <TableCell 
          padding="checkbox"
          className={classNames({'Disabled': disabled, 'Default-margin': props.defaultMargin})}>
          <Checkbox 
            disabled={disabled}                     
            indeterminate={numSelected > 0 && numSelected < rowCount}
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
            className={classNames({'Default-margin-no-checkbox': !selectable && props.defaultMargin})}
          >
            <TableSortLabel
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}              
              onClick={(event, property) => {
                if(!isFetching) {
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
  );
}

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

const DragHandle = sortableHandle(() => <img alt="Order" src={orderIcon} className="Drag-handle"/>)

const SortableItem = sortableElement(({component}) => (
  <React.Fragment>    
    {component}
  </React.Fragment>
))

const SortableContainer = sortableContainer(({children}) => {
  return <React.Fragment>{children}</React.Fragment>
})

const DataGridBlazon = (props) => {

  const {
    columns, 
    size,
    rowsPerPageList, 
    list, 
    method,
    body,
    fetching, 
    links, 
    type, 
    height, 
    expand, 
    expandAll,
    beforeExpand,
    handleClick, 
    actions, 
    handleSortable, 
    handleSelected,
    selecteds, 
    bindId,
    disabled,
    filter,
    noHover,
    filterOptions,
    defaultOrderBy,
    template,
  } = props  
  
  const classes = useStyles()
  const sortable = handleSortable && typeof handleSortable === "function"
  const [open, setOpen] = React.useState(false)
  const [transition] = React.useState(undefined)
  const [rows, setRows] = React.useState([])
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState(null)
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(size || ((type === "pagination" && rowsPerPageList[0]) || 0))
  const [isFetching, setIsFetching] = React.useState(fetching)
  const [gridLinks, setGridLinks] = React.useState(links)
  const [expanded, setExpanded] = React.useState([])

  useEffect(() => {  
    if(!!list) {
      if(!open) {
        setGridLinks(links)
        setIsFetching(fetching)
        setPage(0)
        if(type === 'pagination') {        
          setRowsPerPage(size || rowsPerPageList[0])
        } else {
          setRowsPerPage(10000)
        }
        if(selecteds && selecteds.length) {
          setSelected(selecteds || [])
          setOpen(true)
        }  
        if(defaultOrderBy) {
          const _defaultOrder = defaultOrderBy.split(":")
          if(_defaultOrder.length === 2) {
            setOrder(_defaultOrder[1])
            setOrderBy(_defaultOrder[0])
          }
        } else {
          setOrderBy(null)
        }                          
        setRows(list.map((u) => ({...u, id: (bindId && bindId(u)) || u.identifier}))) 
      } else {       
        if(props.selecteds && !props.selecteds.length) {
          setSelected([])
          setOpen(false)
        }
      }                
    }    

  }, [list, size, open, links, fetching, rowsPerPageList, bindId, type, selecteds, defaultOrderBy, props])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';    
    const orderChanged = (property + ':' + (isAsc ? 'desc' : 'asc'))

    let link = verifyPageLink('self')

    if(link) {

      link = link.replace(/{.*?}/g, '')
      
      let url = replaceQueryParam(link, 'page', '0')
      url = replaceQueryParam(url, 'ord', orderChanged)    

      setIsFetching(true)

      axios
      .request({
        url,
        method: method || 'POST',
        data: body || {}
      })
      .then(({ data }) => {
        setGridLinks(data.links) 
        setRows(data.representation.map((u) => ({...u, id: u.identifier})))
        setPage(0)
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
        setIsFetching(false)
      }) 
    } else {            
      rows.sort((a, b) => isAsc ? (("" + a[property]) || "").localeCompare(b[property]) : (("" + b[property]) || "").localeCompare(a[property]))     
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
      setRows(rows)
    }
  }

  const handleSelectedAll = (newSelected) => {
    
    if(handleSelected && newSelected) {      
      handleSelected(newSelected, () => {
        setOpen(false) 
        setSelected([])
      }, () => {
        if(newSelected.length) {
          return rows.filter((r) => newSelected.indexOf(r.id) > -1)
        }                
        return []
      })
    }
  }

  const handleSelectAllClick = (event) => {

    if(getRows().length === 0) {
      return
    }

    let newSelected = []

    if (event.target.checked) {
      newSelected = getRows()
        .filter((r) => (selected || []).indexOf(r.id) === -1) 
        .map((n) => n.id)

      setSelected([...selected, ...newSelected])
      setOpen(true) 
      handleSelectedAll([...selected, ...newSelected])     
    } else {
      newSelected = (selected || []) 
        .filter((id) => !getRows().filter((r) => r.id === id).length)
      
      setSelected(newSelected)

      if(!newSelected.length) {
        setOpen(false)
      }

      handleSelectedAll(newSelected)
    }
  }

  const handleSelectedClick = (event, id, row) => {

    event.stopPropagation()

    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
    handleSelectedAll(newSelected)

    if(newSelected.length) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    let size = parseInt(event.target.value, 10)
    setRowsPerPage(size)    
    setPage(0)

    let link = verifyPageLink('self')   
    
    if(link) {

      link = link.replace(/{.*?}/g, '')

      let url = replaceQueryParam(link, 'page', '0')
      url = replaceQueryParam(url, 'size', '' + size)
        
      axios
      .request({
        url,
        method: method || 'POST',
        data: {}
      })
      .then(({ data }) => {
        setGridLinks(data.links) 
        setRows(data.representation.map((u) => ({...u, id: (bindId && bindId(u)) || u.identifier})))
        setPage(0)
      })
    }         
  }

  const handlePaginationClick = (type) => {
    
    let link = verifyPageLink(type)
       
    if(link) {

      link = link.replace(/{.*?}/g, '')

      setIsFetching(true)

      axios
        .request({
          url: link,
          method: method || 'POST',
          data: body || {}
        })
        .then(({ data }) => {
          setGridLinks(data.links); 
          setRows(data.representation.map((u) => ({...u, id: (bindId && bindId(u)) || u.identifier})))
          setIsFetching(false)
        })

    }       
  }

  const handleExpand = (row, isOpen) => {

    if(isOpen) {
      if(expanded.indexOf(row.id) === -1) {
        expanded.push(row.id)   
        setExpanded(expanded)     
      }
    } else {
      setExpanded(expanded.filter((e) => e !== row.id))
    }     
  }

  const isSelected = (id) => {
    return selected.indexOf(id) !== -1
  }

  const verifyPageLink = (type) => {

    if(gridLinks) {
      let nextLinks = gridLinks.filter((l) => l.rel === (type || "next"))

      if(nextLinks.length) {
        return nextLinks[0].href
      }
    }

    return null
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    if(handleSortable) {
      handleSortable(arrayMove(rows, oldIndex, newIndex))
    }
  } 

  let extraColumns = 0;

  if(props.expand) {
    extraColumns++
  }

  if(props.selectable) {
    extraColumns++
  }

  const getRows = () => {

    return stableSort(rows, getComparator(order, orderBy), props.default, filter, filterOptions)
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }

  const isNext = () => {  
       
    return (stableSort(rows, getComparator(order, orderBy), props.default, filter, filterOptions)
      .slice((page + 1) * rowsPerPage, (page + 1) * rowsPerPage + rowsPerPage)).length
  }

  const _rows = getRows()

  return(
 
    <div className={`${classes.root} ${props.default ? classes.default : ''}`}>                 
      <div style={{width: '100%'}}>
      <TableContainer style={ height > 0 ? {minHeight: height + 'px', maxHeight: height + 'px'} : null}>
          {isFetching && (<div className={classes.loading}>
            <CircularProgress color="primary" />
          </div>)}
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="Data Table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              columns={columns}
              selected={selected}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rows={_rows}
              expand={expand}
              selectable={props.selectable}
              disabled={disabled}
              defaultMargin={props.defaultMargin}
              isFetching={isFetching}
            />
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
              <TableBody>                           
                {_rows                 
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id)
                    const labelId = `enhanced-table-checkbox-${index}`
                    const child = (
                      <Row 
                        key={labelId} 
                        columns={columns} 
                        row={row} 
                        isSelected={isItemSelected} 
                        labelId={labelId} 
                        handleClick={handleClick} 
                        handleSelectedClick={handleSelectedClick} 
                        handleExpand={handleExpand} 
                        expanded={expanded}
                        expand={expand} 
                        expandAll={expandAll}
                        beforeExpand={beforeExpand}
                        selectable={props.selectable}                        
                        sortable={sortable} 
                        colspan={columns.length + extraColumns}
                        disabled={disabled}
                        noHover={noHover}
                        defaultMargin={props.defaultMargin}/>
                    )                      
                    return (
                      sortable ? <SortableItem key={labelId} index={index} component={child} /> : child                              
                    )
                  })}                                                                           
                {(( _rows.length > 0 && !isFetching && ((!links && !isNext()) || (links && !verifyPageLink())) ) || (!isFetching && _rows.length === 0)) && (
                  <TableRow style={{height: (height && _rows.length === 0 ? height - 100 : 0) + 'px'}}>
                    <TableCell colSpan={columns.length + extraColumns}>
                      <CustomNoRowsOverlay isEmpty={_rows.length === 0} template={template}/>
                    </TableCell>  
                  </TableRow>
                )}
              </TableBody>
            </SortableContainer>
          </Table>
        </TableContainer>
        {type === 'pagination' && !sortable && links && _rows.length ? 
          (<TablePagination
            className={classes.tablePagination} 
            rowsPerPageOptions={[]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={() => ''}
            labelRowsPerPage=''
            backIconButtonProps={{
              'aria-label': 'Previous Page',
              'onClick': () => handlePaginationClick('prev'),
              'disabled': !verifyPageLink('prev')
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
              'onClick': () => handlePaginationClick('next'),
              'disabled': !verifyPageLink()
           }}
          />) : null}     
        {type === 'pagination' && !links ? 
          (<TablePagination
            rowsPerPageOptions={rowsPerPageList}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />) : null}     
      </div>      
      <Snackbar
        open={open}                       
        total={selected.length}
        key={transition ? transition.name : ''}
        className={classes.snackbar}
        action={
          <div className={classes.buttonSelectedContent}>
            {actions}
          </div>          
        }
      />                                                
    </div>    
  )  
}

const mapStateToProps = store => ({});

export default connect(mapStateToProps)(DataGridBlazon)