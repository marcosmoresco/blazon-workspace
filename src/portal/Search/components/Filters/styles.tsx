
import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme:Theme) => createStyles({ 
  filters: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 8,
    cursor: 'pointer',
  },
  filter: {
    background: '#FFFFFF',
    borderRadius: 6,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
  filterIcon: {
    background: '#E9E8EB',
    borderRadius: 8,
    padding: '4px',
    marginRight: 8,
  },
  filterCaretRight: {
    marginLeft: 20,
  },  
  searchFiltersHeader: {
    padding: '27px 27px 0 27px',
  },
  searchFiltersPadding: {
    padding: '0 27px'
  },
  searchFilters: {
    width: 454,        
    '& .Search-filter-close': {
      display: 'flex',
      justifyContent: 'flex-end',
      '& img': {
        cursor: 'pointer'
      }
    }, 
    '& .Filters-expand': {
      width: 16,
    },
    '& .Filtered-expand': {
      cursor: 'pointer',
      width: 24,
    },
    '& .Content-header-search': {
      width: '100%',
      height: 42,
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        borderRadius: 8
      },
      '& input': {
        padding: '11.5px 10px 10px 10px'
      },
    },            
    '& .Divider': {
      width: '100%',
      height: 1,
      backgroundColor: '#D4D3D9',
      margin: '10px 0 32px 0',
    },
    '& .Filters-selected-title': {
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '22px',
      color: '#4F486A',
    },
    '& .Filters-selected-subTitle': {
      fontSize: 14,
      lineHeight: '21px',     
      color: '#514D65',
      marginTop: 8,
    }
  },
  searchFiltersContent: {
    display: 'flex',
    justifyContent: 'space-between',
    '& .Search-filters-title': {
      fontSize: 16,
      lineHeight: '24px',
      color: '#777779',
    },    
    '&.Filters-header': {
      marginBottom: 16,
      padding: '0 27px',
    },    
  },
  searchFiltersContentTitle: {
    lineHeight: '50px',
  },
  searchFiltersContentDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E9E8EB',
    '&.Expanded': {
      marginBottom: 8,
    }    
  },
})

export default useStyles