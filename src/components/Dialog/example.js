import React, { Component } from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { path } from '../../constants'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import PersonIcon from '@material-ui/icons/Person'
import DataGrid from '../../components/DataGrid'
import Autocomplete from '../../components/Autocomplete'
import Dialog from '../../components/Dialog'
import TextField from '../../components/TextField'
import plusIcon from '../../icons/plus.svg'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { getRoles } from './actions'

let schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string()
})

const styles = () => ({    
    card: {
      marginTop: 23,  
      marginBottom: 23,  
      boxShadow: '0px 0px 28px rgba(0, 0, 0, 0.25)',
      '& .active': {
        backgroundColor: '#E5F0F5',
        border: '1px dotted #00659B',
        color: '#00659B',
        padding: '5px 10px',
        height: '32px',           
        lineHeight: 0
      },
      '& .inactive': {
        backgroundColor: '#FFE7ED',
        border: '1px dotted #FF134A',
        color: '#FF134A',
        padding: '5px 10px',
        height: '32px',            
        lineHeight: 0
      }     
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
      marginTop: 30,
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
      '& thead tr': {               
        height: 42,
        background: '#E5E5EA',       
        '& th' : {
          textAlign: 'initial',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 15,
          color: '#232325',
          '&.checkbox': {                
              width: 50,
              textAlign: 'end'
          }
        }        
      },
      '& tbody tr': {
        borderBottom: '1px solid #C4C4C4',
        lineHeight: '55px',
        cursor: 'pointer',
        '& td': {
          fontSize: '15px',
          color: '#232325',
          '&.checkbox': {
            width: 50,
            textAlign: 'end'
          }
        },
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }
      },
      '& .sortable': {
        cursor: 'pointer'
      },
      '& .orderIcon': {
        position: 'relative',
        top: 5
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

const columns = [    
    { field: 'name', headerName: 'Name', width: 70, sortable: true, resizable: true},    
    { field: 'status', headerName: 'Status', width: 180, resizable: true, renderCell: (row) => <div><span className={classNames({'active': row.status === 'ACTIVE'}, {'inactive': row.status === 'INACTIVE'})}>{row.status}</span></div>},
]

class Role extends Component { 

  constructor(props) {
    super(props)
    
    this.state = {
      isFetching: true,
      form: {},
      validation: {
        isValid: false       
      },
      openNew: false,      
      links: [],
      roles: []      
    }               
   
    this.handleClickNew = this.handleClickNew.bind(this)   
    this.handleClickRow = this.handleClickRow.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, name) {
    const { form, validation } = this.state    
    form[name] = event.target.value  

    const { isValid } = validation
        
    validation.isValid = schema.isValidSync(form)    

    if(isValid !== validation.isValid) {
      this.setState({...this.state}) 
    }
       
  }
  
  handleClickNew() {
    this.setState({...this.state, openNew: true})  
  }

  handleClickRow(row) {
    this.props.history.push( path + '/users/edit/' + row.id )   
  }   

  componentDidMount() {  
    let filters = {}
    const { dispatch } = this.props

    dispatch(getRoles(filters, 25))
      .then((roles) => {             
        this.setState({isFetching: false, links: roles.payload.links, roles: roles.payload.representation}) 
      })        
  }

  render() {

    const { classes } = this.props

    const { openNew, validation } = this.state 

    return (
      <div className="Default-content">  
          <div className="Breadcrumbs-content">
              <h1 className="Breadcrumbs-title">Roles</h1> 
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">                
                  <div className="Breadcrumb-title-content">                    
                      <PersonIcon /> <span className="Breadcrumb-title">Roles</span>                    
                  </div>
                 <div>Search</div>            
              </Breadcrumbs>
          </div> 
          <Card className={classes.card}> 
              <div className={classes.inputSearch}>                                                     
                  <Autocomplete />
                  <Button className={classes.buttonGreen} onClick={this.handleClickNew} variant="contained" id="Button-new-role" startIcon={<img alt="Filter" src={plusIcon} />}>New</Button>
              </div>
              <div>           
                <DataGrid height={600} list={this.state.roles} links={this.state.links} fetching={this.state.isFetching} columns={columns} page={1} size={10} rowsPerPageList={[25, 50, 75, 100]} handleClick={this.handleClickRow} selectable type="pagination"/>
              </div> 
          </Card>   
          <Dialog title="New" subTitle="Enter the data below to save" open={openNew} isValid={validation.isValid} onClose={() => this.setState({...this.state, openNew: false})}>
            <div>        
              <TextField                              
                  className={classes.input}
                  label="Name"
                  name="name"
                  placeholder="Enter the name"                  
                  required
                  onChange={(event) => this.handleChange(event, 'name')}                   
                  variant="outlined" />       
              <TextField   
                  multiline
                  rowsMax={4}  
                  rows={4}                 
                  className={classes.input} 
                  label="Description"
                  placeholder="Enter the description"   
                  onChange={(event) => this.handleChange(event, 'description')}          
                  variant="outlined" />
            </div>
          </Dialog>                 
      </div>       
    )
  }              
}

const mapStateToProps = state => ({})
  
export default connect(mapStateToProps)(withStyles(styles)(withRouter(Role)))