import React, { useEffect } from 'react'
import 'date-fns'
import { injectIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import CalendarIcon from '@icons/Calendar'
import DateFnsUtils from '@date-io/date-fns'
import { parse, format } from 'date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers'

//const dateFns = new DateFnsUtils()

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0,
      width: '100%',
      '& input': {
        padding: '11.5px 11.5px 11.5px 0'
      },
      '& .MuiOutlinedInput-adornedStart': {
        paddingLeft: 0
      }
    },
    '& label': {
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "14px",
      textTransform: "uppercase",
      paddingBottom: 8,
    }   
  }
}));

const formatDate = (isTime:any, value:any) => {

  let formatedDate = null
  if(value) {
    const date = parse(value, (isTime && 'dd/MM/yyyy HH:mm:ss') || 'dd/MM/yyyy', new Date())     
    if (date !== 'Invalid Date') {
      formatedDate = date
    }
  }  
  return formatedDate
}

const DatePicker = (props:any) => {

  const classes = useStyles()

  const { isTime, onChange, value, label, required, intl, ...other } = props

  const [selectedDate, setSelectedDate] = React.useState(formatDate(isTime, value))

  useEffect(() => {    
    setSelectedDate(formatDate(isTime, value))             
  }, [isTime, value])

  const handleDateChange = (date:any) => {
          
    if(date && !isNaN(date)) {
      setSelectedDate(date)
      if (onChange) {
        onChange(format(date, (isTime && 'dd/MM/yyyy HH:mm:ss') || 'dd/MM/yyyy'))
      }
    } 
  }

  const handleDateBlur = (date:any) => {
          
    if(!date || isNaN(date)) {
      onChange(null)
    }  
  }

  let inputLabel = label

  if (typeof label === 'object') {
    inputLabel = intl.formatMessage({ id: label.props.id })
  }

  const Picker = isTime ? KeyboardDateTimePicker : KeyboardDatePicker

  return (

    <div className={classes.root}>
      <label>{(required && inputLabel + '*') || inputLabel}</label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Picker
          {...other}
          value={selectedDate}
          onChange={handleDateChange}
          onBlur={handleDateBlur}
          autoOk={true}
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          format={isTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}
          margin="normal"
          id={`date-picker-inline-${inputLabel}`}
          label=''
          InputAdornmentProps={{ position: "start" }}
          keyboardIcon={<CalendarIcon/>}
        />
      </MuiPickersUtilsProvider>
    </div>

  );
}

export default injectIntl(DatePicker)