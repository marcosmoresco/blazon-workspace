
import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme:Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.type === 'light' ? '#FFFFFF' : '#0D0C13',   
  },
  toolBar: {
    minHeight: 93,
    marginLeft: 65,
    display: 'flex',
    justifyContent: 'space-between'
  },
  logoSearchInput: {
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    height: 48,
    marginLeft: 42,
    width: 600,
    borderRadius: 8
  },
  menuOptionsContent: {
    display: 'flex',
    alignItems: 'center'
  },
  menuOptions: {
    display: 'flex'
  },
  optionImage: {
    marginRight: 27
  },
  menuList: {
    marginTop: 10,
    marginRight: 20,
    width: 300,   
    boxShadow: '0px 4px 74px rgba(0, 0, 0, 0.16)',
    borderRadius: 8,
    '& .MuiMenuItem-root': {
      marginBottom: 10
    },
    '& .MuiDivider-root': {
      marginBottom: 10
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16
  },
  menuImage: {
    '&.blue': {
      backgroundColor: '#0E46D7',
    },
    '&.red': {
      backgroundColor: '#FF134A  ',
    },
    '&.yellow': {
      backgroundColor: '#FBB13C',
    },      
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 12,   
  },
  caretRight: {
    position: 'absolute',
    right: 15
  },
  darkMode: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B202A',
    color: '#FFFFFF',
    width: '100%',
    borderRadius: 4,
    height: 52,    
  },
  darkModeText: {
    backgroundColor: '#1B202A',
    paddingLeft: 15
  },
  darkModeSwitch: {
    backgroundColor: '#323740',
    height: 52,
    display: 'flex',
    alignItems: 'center',
    '& .MuiSwitch-track': {
      backgroundColor: '#76797F',
    }
  }
})

export default useStyles