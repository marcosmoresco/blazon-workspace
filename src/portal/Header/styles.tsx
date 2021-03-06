import { createStyles, Theme, styled as styledMui } from '@material-ui/core/styles'
import styled from "styled-components";
import MuiBadge from '@material-ui/core/Badge'

export const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.header.main || "#FFFFFF"
    },
    toolBar: {
      minHeight: 93,    
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: 1312,
      minWidth: 1312,
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: 0,
      paddingRight: 0,
      gap: 55
    },
    logoSearchInput: {
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      height: 48,
      marginLeft: 22,
      width: 600,
      borderRadius: 8,
      backgroundColor: '#FFFFFF',
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        padding: '2px 9px',
        borderRadius: 8,
        height: 48,
        backgroundColor: theme.palette.header.light || "#FFFFFF",
        color: theme.palette.header.contrastText || "#FFFFFF",
        '& .MuiAutocomplete-clearIndicator': {
          color: theme.palette.header.contrastText || "#FFFFFF",
        }
      }
    },
    menuLogo: {
      cursor: 'pointer',
      minWidth: 180,
      '& img': {
        maxWidth: 180,
        maxHeight: 90
      }      
    },
    menuOptionsContent: {
      display: 'flex',
      alignItems: 'center'
    },
    menuOptions: {
      display: 'flex'
    },
    optionImage: {
      marginRight: 15,
      cursor: 'pointer',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderRadius: 4,
      '&.Active::after': {
        content: '""',
        display: 'block',
        height: 4,
        width: 38,
        marginTop: 89,
        position: 'absolute',
        backgroundColor: theme.palette.primary.main || "#0E46D7"
      },
      '&:hover': {
        background: '#F4F4F5'
      }
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
      '& a': {
        color: 'initial',
        textDecoration: 'none',
        width: '100%'
      },
      '& a:hover': {       
        textDecoration: 'none'
      }
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 16
    },
    menuImage: {
      '&.blue': {
        backgroundColor: '#0E46D7'
      },
      '&.red': {
        backgroundColor: '#FF134A  '
      },
      '&.yellow': {
        backgroundColor: '#FBB13C'
      },
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      marginRight: 12
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
      height: 52
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
        backgroundColor: '#76797F'
      }
    }
  });

export const HeaderProfileBox = styled.div`
  display: flex;
  align-items: center;
`;  

export const HeaderProfileBoxInfo = styled.div`
  display: block;
  margin-left: 10px;
  text-align: initial;
  text-transform: initial;

  .Username {
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    color: #1B202A;
    margin-bottom: 4px;
    max-width: 83px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .FirstName {
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    color: #1B202A;
    max-width: 83px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const HeaderFixAutocomplete = styled.div`
  width: 600px;
  height: 48px;
  margin-left: 42px;
`;

export const Badge = styledMui(MuiBadge)({ 
  '& .MuiAvatar-root': {
    width: 20,
    height: 20,
    fontSize: 11,
    borderRadius: 10
  }
})