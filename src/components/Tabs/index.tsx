import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

function TabPanel(props) {
  
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
    
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
    
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
    
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    tabs: {   
      borderBottom: '1px solid #C9C9C9',
      ".PrivateTabIndicator-colorSecondary-31": {
        background: "#0992CC",
        height: "4px"
      }    
    },
    tab: {       
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 16,    
      letterSpacing: '0.0125em',
      color: '#232325',
      textTransform: 'initial',
      padding: '16px 12px 8px 12px',
      maxWidth: 500
    },
    card: {
      marginTop: 23,
      marginBottom: 50,
      boxShadow: '0px 0px 28px rgba(0, 0, 0, 0.25)'    
    },
    tabPanel: {   
      "& .MuiBox-root": {
        padding: 0
      }
    },
    inputSearch: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '24px 24px 0px 24px'
    },
    inputFilter: {     
      padding: '0 !important',
      height: 24
    },
    buttonGreen: {   
      borderRadius: 20,
      color: '#FFFFFF',  
      backgroundColor: '#06AD5D',
      textTransform: 'initial',
      fontWeight: 600,
      '&:hover': {
        backgroundColor: '#06AD5D'
      }
    }, 
    chipFilters: {
      height: 23,
      background: '#E0F4FA',
      opacity: 0.6,
      fontSize: 13,
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 21,
      letterSpacing: '0.0025em',
      color: '#0992CC',
      border: '1px solid #0992CC',
      marginRight: 7
    },
    listContainer: {
      marginTop: 23
    },
    listChipContainer: {
      padding: '0 24px'
    },
    clearLink: {    
      marginLeft: 15
    },
    clearLinkText: {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 15,   
      textAlign: 'right',
      letterSpacing: '0.0015em',
      textDecorationLine: 'underline',
      color: '#232325',
      marginLeft: 3    
    },
    clearLinkImg: {
      position: 'relative',
      top: 2
    },
    listItems: {
      margin: '10px 0',
      '& .MuiIconButton-label': {
        marginLeft: 12
      }
    },
    listItemsTitle: {
      fontSize: 15,    
      color: '#232325'
    },
    listItemsSubTitle: {
      fontSize: 12,
      color: '#4B4B4D'
    },
    listItemsContainer: {
      margin: '10px 0'
    },
    listDivider: {
      height: 1,    
      background: '#777779',
      opacity: 0.4,
      width: '100%',
      position: 'absolute'
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
      '& button:not(:last-child)': {
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
        '& .MuiSnackbarContent-message': {
          fontSize: 15,
          color: '#FCFCFC'
        }
      }    
    },
    loadMoreContent: {
      display: 'flex',
      justifyContent: 'center'
    },
    labelContainer: {
      width: "auto",
      padding: 0,
    },
    iconLabelWrapper: {
      flexDirection: "row-reverse",
    }
  }));
  
  const StyledTabs = withStyles({
    indicator: {    
      backgroundColor: '#0992CC',
      height: 4    
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
  
  
  export default function CustomizedTabs (props) {
    
    const { tabs } = props

    const classes = useStyles()
    const [value, setValue] = React.useState(0)
          
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
       
      <div>
        <StyledTabs indicatorColor="primary" value={value} onChange={handleChange} className={classes.tabs} aria-label="simple tabs example">
          
          { tabs.map((t, i) => (
            <Tab 
              key={`Tab-title-${t.id || t.name}`} 
              classes={{
                wrapper: classes.iconLabelWrapper,               
              }}
              className={classes.tab} 
              label={t.name} 
              icon={t.icon} 
              {...a11yProps(i)} 
            />)) 
          }
                                
        </StyledTabs>

        { tabs.map((t, i) => (<TabPanel key={`Tab-panel-${t.id || t.name}`} value={value} index={i} className={classes.tabPanel}> {t.content} </TabPanel>) ) }                                       
      </div>   
    )  
  }