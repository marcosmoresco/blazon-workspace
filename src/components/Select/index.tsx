import React, {useEffect} from 'react'
import Image from 'next/image'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import CaretDownIcon from '@icons/CaretDown'
import CaretUpIcon from '@icons/CaretUp'


const useStyles = makeStyles((theme) => ({    
  root: {
    '& .MuiSelect-select': {
      paddingTop: '11.5px',
      paddingBottom: '11.5px',
      position: 'relative',     
    },
    '& .MuiSelect-icon': {
      top: 15,
      right: 10
    },
    '& .PrivateNotchedOutline-legendLabelled-3': {
      width: 0
    },
    '& .MuiSelect-nativeInput': {
      width: 'auto'
    },
    '& legend': {
      display: 'none'
    },
    '& fieldset': {
      height: 42,
      top: 0
    },
    '& svg': {
      marginRight: 10,
      marginLeft: 10
    }  
  },
}))

export default function CustomizedSelect(props:any) {
  
  const classes = useStyles()
  const { bind, view, label, required, ...other } = props
  const [ options, setOptions ] = React.useState(props.options || [])

  useEffect(() => {    
    setOptions(props.options || [])
  }, [props, setOptions])
  
  return (
    <div>
      <label>{label}{required && '*'}</label>
      <Select
        {...other}  
        variant={props.variant || "outlined"}
        label=""
        className={classes.root}
        IconComponent = {props => (
         props.className.indexOf('iconOpen') > -1 ? <CaretUpIcon {...props} /> : <CaretDownIcon {...props} />
        )}                                   
        style={{width: "100%"}}             
      >
        {(options || []).map((option:any, index:number) => (
          <MenuItem key={bind ? option[bind] : `select-item-${label}-${index}`} value={bind ? option[bind] : option}>
            {view ? option[view] : option}
          </MenuItem>
        ))}
      </Select>
    </div>                                                           
  )
} 