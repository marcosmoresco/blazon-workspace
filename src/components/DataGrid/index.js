import React from 'react'
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
import { getComparator, stableSort, styles } from './constants'

class DataGridBlazon extends React.Component {
  constructor(props) {
    super(props)

    const {
      size,
      type,
      rowsPerPageList,
      isFetching,
      links,
      list,
      selecteds,
      bindId
    } = props

    this.state = {
      open: (selecteds || []).length,
      transition: undefined,
      rows: (list || []).map((u) => ({
        ...u,
        id: (bindId && bindId(u)) || u.identifier
      })),
      order: 'asc',
      orderBy: null,
      selected: selecteds || [],
      page: 0,
      rowsPerPage: size || (type === 'pagination' && rowsPerPageList[0]) || 0,
      isFetching,
      gridLinks: links,
      expanded: []
    }
  }

  componentDidMount() {
    const { fetching } = this.props

    this.setState({
      isFetching: fetching
    })
  }

  componentDidUpdate(prevProps) {
    const {
      size,
      rowsPerPageList,
      list,
      fetching,
      links,
      type,
      selecteds,
      bindId,
      defaultOrderBy,
      expandAll
    } = this.props

    const { open, isFetching, internalFetching, selected } = this.state

    if (!!list) {
      if (!open && fetching !== isFetching && !internalFetching) {
        this.setState({
          gridLinks: links,
          isFetching: fetching,
          page: 0
        })
        if (type === 'pagination') {
          this.setState({
            rowsPerPage: size || rowsPerPageList[0]
          })
        } else {
          this.setState({
            rowsPerPage: 10000
          })
        }
        if (selecteds && selecteds.length) {
          this.setState({
            open: true,
            selected: selecteds || []
          })
        }
        if (defaultOrderBy) {
          const _defaultOrder = defaultOrderBy.split(':')
          if (_defaultOrder.length === 2) {
            this.setState({
              order: _defaultOrder[1],
              orderBy: _defaultOrder[0]
            })
          }
        } else {
          this.setState({
            orderBy: null
          })
        }
        this.setState({
          rows: list.map((u) => ({
            ...u,
            id: (bindId && bindId(u)) || u.identifier
          }))
        })
      } else {
        if (selecteds && !selecteds.length && selected.length) {
          this.setState({
            selected: [],
            open: false
          })
        }
        if (prevProps.expandAll && !expandAll) {
          this.setState({
            expanded: []
          })
        }
      }
    }
  }

  render() {
    const {
      columns,
      rowsPerPageList,
      method,
      body,
      links,
      query,
      params = {},
      getResponseLinks,
      getResponse,
      type,
      height,
      expand,
      expandAll,
      beforeExpand,
      handleClick,
      actions,
      handleSortable,
      handleSelected,
      bindId,
      disabled,
      filter,
      noHover,
      filterOptions,
      template,
      classes,
      align
    } = this.props

    const {
      order,
      orderBy,
      rows,
      selected,
      expanded,
      gridLinks,
      page,
      rowsPerPage,
      isFetching,
      open,
      transition
    } = this.state

    const sortable = handleSortable && typeof handleSortable === 'function'

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      const orderChanged = property + ':' + (isAsc ? 'desc' : 'asc')

      let link = verifyPageLink('self')

      if (link) {
        link = link.replace(/{.*?}/g, '')

        if (query) {
          const size = Number(getQueryParam('size', link))
          const page = 0
          const ord = orderChanged

          apolloClient
            .query({
              query,
              variables: {
                page,
                size,
                ord,
                ...params  
              }
            })
            .then(({ data }) =>
              this.setState({
                isFetching: false,
                internalFetching: false,
                gridLinks: (getResponseLinks && getResponseLinks(data)) || (data?.getRepresentation?.links || []),
                rows: ((getResponse && getResponse(data)) || (data?.getRepresentation?.representation || [])).map((u) => ({...u, id: (bindId && bindId(u)) || u.identifier})),                
                page: 0,
                order: isAsc ? 'desc' : 'asc',
                orderBy: property
              })
            )
        } else {
          let url = replaceQueryParam(link, 'page', '0')
          url = replaceQueryParam(url, 'ord', orderChanged)

          this.setState({ isFetching: true, internalFetching: true })

          axios
            .request({
              url,
              method: method || 'POST',
              data: body || {}
            })
            .then(({ data }) => {
              this.setState({
                isFetching: false,
                internalFetching: false,
                gridLinks: data.links,
                rows: (data.representation || []).map((u) => ({
                  ...u,
                  id: (bindId && bindId(u)) || u.identifier
                })),
                page: 0,
                order: isAsc ? 'desc' : 'asc',
                orderBy: property
              })
            })
        }
      } else {
        rows.sort((a, b) =>
          isAsc
            ? ('' + a[property] || '').localeCompare(b[property])
            : ('' + b[property] || '').localeCompare(a[property])
        )
        this.setState({
          rows,
          order: isAsc ? 'desc' : 'asc',
          orderBy: property
        })
      }
    }

    const clearSelected = {
      execute: () => {
        this.setState({
          open: false,
          selected: []
        })
      }
    }

    const handleSelectedAll = (newSelected) => {
      if (handleSelected && newSelected) {
        handleSelected(newSelected, clearSelected, () => {
          if (newSelected.length) {
            return rows.filter((r) => newSelected.indexOf(r.id) > -1)
          }
          return []
        })
      }
    }

    const handleSelectAllClick = (checked) => {
      if (getRows().length === 0) {
        return
      }

      let newSelected = []

      if (checked) {
        newSelected = getRows()
          .filter((r) => (selected || []).indexOf(r.id) === -1)
          .map((n) => n.id)

        this.setState({
          selected: [...selected, ...newSelected],
          open: true
        })
        handleSelectedAll([...selected, ...newSelected])
      } else {
        newSelected = (selected || []).filter(
          (id) => !getRows().filter((r) => r.id === id).length
        )

        this.setState({
          selected: newSelected
        })

        if (!newSelected.length) {
          this.setState({
            open: false
          })
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
          selected.slice(selectedIndex + 1)
        )
      }

      this.setState({
        selected: newSelected
      })

      handleSelectedAll(newSelected)

      if (newSelected.length) {
        this.setState({
          open: true
        })
      } else {
        this.setState({
          open: false
        })
      }
    }

    const handleChangePage = (event, newPage) => {
      this.setState({
        page: newPage
      })
    }

    const handleChangeRowsPerPage = (event) => {
      let size = parseInt(event.target.value, 10)
      this.setState({
        rowsPerPage: size,
        page: 0
      })

      let link = verifyPageLink('self')

      if (link) {
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
            this.setState({
              gridLinks: data.links,
              rows: data.representation.map((u) => ({
                ...u,
                id: (bindId && bindId(u)) || u.identifier
              })),
              page: 0
            })
          })
      }
    }

    const handlePaginationClick = (type) => {
      let link = verifyPageLink(type)

      if (link) {
        link = link.replace(/{.*?}/g, '')

        this.setState({
          isFetching: true,
          internalFetching: true
        })

        if (query) {
          const size = Number(getQueryParam('size', link))
          const page = Number(getQueryParam('page', link))
          const ord = getQueryParam('ord', link)

          apolloClient
            .query({
              query,
              variables: {
                page,
                size,
                ord
              }
            })
            .then(({ data }) =>
              this.setState({
                isFetching: false,
                internalFetching: false,
                gridLinks: data?.getRequests?.links || [],
                rows: (data?.getRequests?.requests || []).map((u) => ({
                  ...u,
                  id: (bindId && bindId(u)) || u.identifier
                }))
              })
            )
        } else {
          axios
            .request({
              url: link,
              method: method || 'POST',
              data: body || {}
            })
            .then(({ data }) => {
              this.setState({
                isFetching: false,
                internalFetching: false,
                gridLinks: data.links,
                rows: data.representation.map((u) => ({
                  ...u,
                  id: (bindId && bindId(u)) || u.identifier
                }))
              })
            })
        }
      }
    }

    const handleExpand = (row, isOpen) => {
      if (isOpen) {
        if (expanded.indexOf(row.id) === -1) {
          expanded.push(row.id)
          this.setState({
            expanded
          })
        }
      } else {
        this.setState({
          expanded: expanded.filter((e) => e !== row.id)
        })
      }
    }

    const isSelected = (id) => {
      return selected.indexOf(id) !== -1
    }

    const verifyPageLink = (type) => {
      if (gridLinks) {
        let nextLinks = gridLinks.filter((l) => l.rel === (type || 'next'))

        if (nextLinks.length) {
          return nextLinks[0].href
        }
      }

      return null
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
      if (handleSortable) {
        handleSortable(arrayMove(rows, oldIndex, newIndex))
      }
    }

    let extraColumns = 0

    if (this.props.expand) {
      extraColumns++
    }

    if (this.props.selectable) {
      extraColumns++
    }

    const getRows = () => {
      return stableSort(
        rows,
        getComparator(order, orderBy),
        this.props.default,
        filter,
        filterOptions
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    const isNext = () => {
      return stableSort(
        rows,
        getComparator(order, orderBy),
        this.props.default,
        filter,
        filterOptions
      ).slice((page + 1) * rowsPerPage, (page + 1) * rowsPerPage + rowsPerPage)
        .length
    }

    const _rows = getRows()

    return (
      <div
        className={`${classes.root} ${
          this.props.default ? classes.default : ''
        }`}
      >
        <div style={{ width: '100%' }}>
          <TableContainer
            style={
              height > 0
                ? { minHeight: height + 'px', maxHeight: height + 'px' }
                : null
            }
          >
            {isFetching ? (
              <div className={classes.loading}>
                <CircularProgress color='primary' />
              </div>
            ) : null}
            <Table
              className={classes.table}
              aria-labelledby='tableTitle'
              size={'medium'}
              aria-label='Data Table'
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
                selectable={this.props.selectable}
                disabled={disabled}
                defaultMargin={this.props.defaultMargin}
                isFetching={isFetching}
              />
              <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                <TableBody>
                  {_rows.map((row, index) => {
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
                        selectable={this.props.selectable}
                        sortable={sortable}
                        colspan={columns.length + extraColumns}
                        disabled={disabled}
                        noHover={noHover}
                        defaultMargin={this.props.defaultMargin}
                      />
                    )
                    return sortable ? (
                      <SortableItem
                        key={labelId}
                        index={index}
                        component={child}
                        collection={_rows.length + new Date().getTime()}
                      />
                    ) : (
                      child
                    )
                  })}
                  {((_rows.length > 0 &&
                    !isFetching &&
                    ((!links && !isNext()) || (links && !verifyPageLink()))) ||
                    (!isFetching && _rows.length === 0)) && (
                    <TableRow
                      style={{
                        height:
                          (height && _rows.length === 0 ? height - 100 : 0) +
                          'px'
                      }}
                    >
                      <TableCell colSpan={columns.length + extraColumns}>
                        <CustomNoRowsOverlay
                          isEmpty={_rows.length === 0}
                          template={template}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </SortableContainer>
            </Table>
          </TableContainer>
          {type === 'pagination' && !sortable && links && _rows.length ? (
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelDisplayedRows={() => ''}
              labelRowsPerPage=''
              backIconButtonProps={{
                'aria-label': 'Previous Page',
                onClick: () => handlePaginationClick('prev'),
                disabled: !verifyPageLink('prev')
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
                onClick: () => handlePaginationClick('next'),
                disabled: !verifyPageLink()
              }}
            />
          ) : null}
          {type === 'pagination' && !links ? (
            <TablePagination
              rowsPerPageOptions={rowsPerPageList}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          ) : null}
        </div>
        <Snackbar
          open={open}
          total={selected.length}
          key={transition ? transition.name : ''}
          className={classes.snackbar}
          align={align}
          action={
            <div className={classes.buttonSelectedContent}>{actions}</div>
          }
        />
      </div>
    )
  }
}

const mapStateToProps = (store) => ({})

export default connect(mapStateToProps)(withStyles(styles)(DataGridBlazon))
