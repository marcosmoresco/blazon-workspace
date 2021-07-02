import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  overrides : {   
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#E5E5E5',
        boxShadow: 'none',
      }
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
        marginBottom: 16,
      }
    }
  },  
  palette: {
    primary: {
      main: '#0E46D7',
    },
    secondary: {
      main: '#DC004E',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F4F4F5',
    },
  },
})

export default theme