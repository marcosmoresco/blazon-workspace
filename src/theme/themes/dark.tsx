import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const dark = createMuiTheme({
  overrides: {
    MuiIcon: {
      root: {
        color: "#FFFFFF",
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
        backgroundColor: "#0F141D",
      },
    },
    MuiButtonBase: {
      root: {
        color: "#FFFFFF",
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#1B202A',
      }
    },
    MuiTableRow: {
      head: {
        background: '#161A21',
      },
      root: {
        background: '#1B202A',
        color: '#FFFFFF',
      }
    },
    MuiBadge: {
      badge: {
        width: 26,
        height: 26,
        borderRadius: 20,
        fontSize: 12,
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
    type: "dark",
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
      default: "#0F141D",
    },
    header: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      contrastText: "#1B202A"
    },
    info: {
      main: "#CFA87D",
      contrastText: "#73512B"
    },
    profileBg: "blue"
  },
});

export default dark;
