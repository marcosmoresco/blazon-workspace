import React from 'react'
import { injectIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Loading from '../Loading'

const useStyles = makeStyles((theme) => ({    
    root: {
      '& .MuiSwitch-colorPrimary.Mui-checked': {
        color: '#0992CC'
      }, 
      '& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#00659B'
      }      
    },
    loading: {
      marginRight: 10,
    }
  }))

const CustomizedSwitch = (props) => {
    
    const classes = useStyles()
    const { label, value, onChange, height, isLoading, intl, ...other } = props   
    const [ checked, setChecked ] = React.useState(value || false)
    
    React.useEffect(() => {  
      setChecked(!!value)       
    }, [value])

    const handleChange = (event) => {
      setChecked(event.target.checked)
      onChange(event.target.checked)       
    }

    let inputLabel = label
    if(label && label.type) {
      inputLabel = intl.formatMessage({id: label.props.id})
    } 
    
    return (
      
      <FormGroup row style={{minHeight: height || 67}} className={classes.root}>
            <FormControlLabel
              control={
              isLoading ? (
                <span className={classes.loading}>
                  <Loading type="blue"/>
                </span>
              ) : (
                <Switch 
                  {...other}                                
                  checked={checked}
                  onChange={handleChange}
                  id={`checked-${inputLabel}`}
                  name={`checked-${inputLabel}`}
                  color="primary"
                />
              )}
              label={label}
          />
      </FormGroup>
                                                           
    )
} 

export default injectIntl(CustomizedSwitch)