import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import arrayMove from 'array-move'
import CircularProgress from '@material-ui/core/CircularProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Snackbar from '../Snackbar'
import { getQueryParam, replaceQueryParam } from '@utils/queryParam'
import { connect } from 'react-redux'
import apolloClient from '@utils/apollo-client'
import axios from 'axios'
import CustomNoRowsOverlay from './components/CustomNoRowsOverlay'
import Head from './components/Head'
import Row from './components/Row'
import { SortableContainer, SortableItem } from './components/Sortable'
import { executeQuery, getComparator, stableSort, styles } from './constants'

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
    classes,
    query,
    queryFilters,
    page: pageParam,
    getResponseLinks,
    getResponse,
  } = props  
  
  const sortable = handleSortable && typeof handleSortable === "function"
  const [open, setOpen] = React.useState(false)
  const [expandAll, setExpandAll] = React.useState(props.expandAll || false)
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
    } else if(expand && props.expandAll !== expandAll) {
      setExpanded([]);
      setExpandAll(props.expandAll);
    } else if(query && pageParam !== page) {  
      let _queryFilters = {...queryFilters};
      if(defaultOrderBy) {
        _queryFilters = {..._queryFilters, ord: defaultOrderBy};
        const _defaultOrder = defaultOrderBy.split(":");
        if(_defaultOrder.length === 2) {
          setOrder(_defaultOrder[1])
          setOrderBy(_defaultOrder[0])
        }
      } else {
        setOrderBy(null)
      }    
      executeQuery({
        setIsFetching,        
        setGridLinks,
        setRows,
        getResponseLinks,
        getResponse,
        query,
        queryFilters: _queryFilters,       
        bindId
      });
    }
  }, [
    list, 
    size, 
    open, 
    links, 
    fetching, 
    rowsPerPageList, 
    bindId, 
    type, 
    selecteds, 
    defaultOrderBy, 
    props,
    expand,
    expandAll,
    getResponse,
    getResponseLinks,
    page,
    pageParam,
    query,
    queryFilters
  ]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';    
    const orderChanged = (property + ':' + (isAsc ? 'desc' : 'asc'))

    let link = verifyPageLink('self')

    if(link) {

      if (query) {

        setIsFetching(true);

        link = link.replace(/{.*?}/g, '');

        const size = Number(getQueryParam('size', link))        
        const ord = orderChanged

        apolloClient
          .query({
            query,
            variables: {
              ...queryFilters,
              page: 0,
              size,
              ord
            }
          })
          .then(({ data }) => {
            setIsFetching(false);
            setGridLinks((getResponseLinks && getResponseLinks(data)) || (data?.getRepresentation?.links || []));
            setRows(((getResponse && getResponse(data)) || (data?.getRepresentation?.representation || [])).map((u) => ({...u, id: (bindId && bindId(u)) || u.identifier})));               
            setPage(0);
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
          });
      }           
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

      if (query) {

        setIsFetching(true);

        const size = Number(getQueryParam('size', link));
        const page = Number(getQueryParam('page', link));
        const ord = getQueryParam('ord', link);

        apolloClient
          .query({
            query,
            variables: {
              ...queryFilters,
              page,
              size,
              ord
            },
            fetchPolicy: "network-only"
          })
          .then(({ data }) => {
            setIsFetching(false);
            setGridLinks((getResponseLinks && getResponseLinks(data)) || (data?.getRepresentation?.links || []));
            setRows(((getResponse && getResponse(data)) || (data?.getRepresentation?.representation || [])).map((u) => ({...u, id: (bindId && bindId(u)) || u.identifier})));               
          })
      }
    }       
  }

  const handleExpand = (row, isOpen) => {

    if(isOpen) {
      if(expanded.indexOf(row.id) === -1) {
        expanded.push(row.id);   
        setExpanded([...expanded]);
      }
    } else {    
      setExpanded([...expanded.filter((e) => e !== row.id)]);
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
            <Head
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
        {type === 'pagination' && !sortable && gridLinks && _rows.length ? 
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
        {type === 'pagination' && !gridLinks ? 
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

export default connect(mapStateToProps)(withStyles(styles)(DataGridBlazon))
