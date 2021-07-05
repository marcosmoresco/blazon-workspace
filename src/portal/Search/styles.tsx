
import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme:Theme) => createStyles({
  root: {      
    marginTop: 20, 
    marginBottom: 20
  },  
  searchtext: {
    fontWeight: 600,
    fontSize: 21,
    color: '#26213F',
    marginTop: 48
  },
  totalItens: {
    fontWeight: 'normal',
    fontSize: 18,
    color: '#676378',
  },
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
  tags: {
    background: '#E9EBF3',
    borderRadius: 4,
    marginTop: 24,
    padding: 10,
    display: 'flex',
    width: 'fit-content',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  tag: {
    fontWeight: 'normal',
    fontSize: 16,
    height: 40,
    lineHeight: '16px',
    color: '#7D7A8C',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&.Active': {
      color: '#0E46D7',
      background: 'rgba(210, 218, 241, 0.42)',
      border: '1px solid rgba(163, 183, 235, 0.4)',
      borderRadius: 6
    },
    '& svg': {
      marginRight: 8
    }
  },
  searchCards: {
    marginTop: 64
  },
  searchCard: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 16px rgba(39, 36, 52, 0.06)',
    borderRadius: 8
  },
  searchCardContent: {
    position: 'relative'
  },
  searchCardContentHeader: {    
    display: 'flex',
    padding: 14,
  },
  searchCardContentHeaderImage: {
    background: '#E9E8EB',
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    marginRight: 8,
  },
  searchCardContentHeaderTitle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#26213F',
  },
  searchCartContent: {
    padding: 16,
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: '14px',
    color: '#26213F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '& svg': {
      marginRight: 10
    }
  }
})

export default useStyles