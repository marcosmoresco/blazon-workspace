import React, { useEffect } from 'react'
import 'date-fns'
import { injectIntl } from 'react-intl'
import { withStyles, createStyles } from '@material-ui/core/styles'
import CalendarIcon from '@icons/Calendar'
import DateFnsUtils from '@date-io/date-fns'
import { parse, format } from 'date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers'

import { Box } from "./styles";

const formatDate = (isTime:any, value:any) => {

  let formatedDate = null
  if(value) {
    const date = parse(value, (isTime && 'dd/MM/yyyy HH:mm:ss') || 'dd/MM/yyyy', new Date())     
    if (date !== "Invalid Date") {
      formatedDate = date
    }
  }  
  return formatedDate
}

const DatePicker = (props:any) => {

  const classes = { props };

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

    <Box>
      <label>{(required && inputLabel + '*') || inputLabel}</label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Picker
          {...other}
          value={selectedDate}
          onChange={handleDateChange}
          onBlur={handleDateBlur}
          autoOk={true}
          variant="inline"
          orientation="landscape"
          inputVariant="outlined"
          format={isTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}
          margin="normal"
          id={`date-picker-inline-${inputLabel}`}
          label=''
          InputAdornmentProps={{ position: "start" }}
          keyboardIcon={<CalendarIcon/>}
        />
      </MuiPickersUtilsProvider>
    </Box>

  );
}

export default injectIntl(DatePicker);