import React, { ChangeEvent, FC, useState } from 'react'
import { injectIntl, IntlShape } from 'react-intl'

import {
  FormControl,
  FormHelperText,
  Input,
  OutlinedInput
} from '@material-ui/core'
import { FormikProps } from 'formik'

type TextFieldProps = {
  intl: IntlShape
  name: string
  label: string
  placeholder?: string
  fullWidth?: boolean
  form: FormikProps<any>
  classes?: any
}

const TextField: FC<TextFieldProps> = ({
  intl,
  name,
  label,
  placeholder,
  form,
  fullWidth = true,
  classes
}) => {
  const { setFieldValue, values, errors } = form

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setFieldValue(name, target.value)

  return (
    <FormControl className={classes?.root} fullWidth={fullWidth}>
      <label htmlFor={name}>{intl.formatMessage({ id: label })}</label>
      <OutlinedInput
        name={name}
        placeholder={placeholder}
        type='password'
        value={values[name]}
        onChange={handleChange}
        fullWidth={fullWidth}
      />
      <FormHelperText error={true}>{errors[name]}</FormHelperText>
    </FormControl>
  )
}

export default injectIntl(TextField)
