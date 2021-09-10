import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
export const blue = createMuiTheme({  
  overrides: {
    MuiIcon: {
      root: {
        color: "#1B202A",
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#E5E5E5",
        boxShadow: "none",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
        marginBottom: 16,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#F4F4F5",
      },
    },
    MuiButtonBase: {
      root: {
        color: "#1B202A",
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#FFFFFF',
      }
    },
    MuiTableRow: {
      head: {
        background: '#E9E8EB',
      },
      root: {
        background: '#FFFFFF',
        color: '#1B202A',
      }
    },
    MuiBadge: {
      badge: {
        width: 26,
        height: 26,
        borderRadius: 20,
        fontSize: 12,       
      },
      colorPrimary: {
        color: "#FFFFFF"
      }
    },   
    MuiBreadcrumbs: {
      root: {
        marginBottom: 10
      }
    }, 
    MuiTabs: {
      indicator: {
        height: 4,
        background: "#0E46D7",
      }
    }   
  },
  palette: {
    type: "light",
    primary: {
      main: "#0E46D7",
    },
    secondary: {
      main: "#DC004E",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#F4F4F5",
    },
    header: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      contrastText: "#1B202A"
    },
    info: {
      main: "rgba(19,119,213,0.14)",
      contrastText: "#1377D5"
    },
    profileBg: "default"
  },
});

export default blue;
