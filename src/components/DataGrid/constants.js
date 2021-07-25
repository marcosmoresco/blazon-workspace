
import apolloClient from '@utils/apollo-client';

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export const stableSort = (array, comparator, isDefault, filter, filterOptions) => {
  const stabilizedThis = array.map((el, index) => [el, index])

  let result = stabilizedThis.map((el) => el[0])

  if (filter) {
    result = result.filter((i) => {

      let res = false

      Object.keys(i).every((key) => {

        if (("" + i[key]).toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          if (filterOptions) {
            if (filterOptions.indexOf(key) > -1) {
              res = true
              return false
            }
          } else {
            if (key !== "identifier") {
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

const customCheckbox = () => ({  
  '& .MuiCheckbox-root': {
    marginLeft: 10
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
})

export const executeQuery = ({ setIsFetching, setGridLinks, setRows, getResponseLinks, getResponse, query, queryFilters, bindId}) => {  

  setIsFetching(true);

  apolloClient
    .query({
      query,
      variables: {
        ...queryFilters
      }
    })
    .then(({ data }) => {
      setIsFetching(false);
      setGridLinks((getResponseLinks && getResponseLinks(data)) || (data?.getRepresentation?.links || []));
      setRows(((getResponse && getResponse(data)) || (data?.getRepresentation?.representation || [])).map((u) => ({...u, id: (bindId && bindId(u)) || u.identifier})));
    })
};

export const styles = (theme) => ({
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
    '& > thead > tr': {
      height: 42,     
      '& th': {
        padding: '0 16px',
        maxHeight: 42,
        textAlign: 'initial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,       
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
    '& > tbody > tr': {
      borderBottom: '1px solid #C4C4C4',
      lineHeight: '55px',
      cursor: 'pointer',
      '& td': {
        fontSize: '15px',       
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
})