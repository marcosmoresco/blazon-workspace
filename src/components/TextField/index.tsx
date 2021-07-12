import React, { ChangeEvent, FC } from 'react'
import { useIntl } from 'react-intl'

import {
  FormControl,
  FormHelperText,
  Input,
  InputProps
} from '@material-ui/core'
import { FormikProps } from 'formik'
import { Label } from './styles'

export interface TextFieldProps extends InputProps {
  name: string
  label?: string
  form: FormikProps<any>
  classes?: any
}

const TextField: FC<TextFieldProps> = ({
  label,
  form,
  classes,
  ...inputProps
}) => {
  const intl = useIntl()
  const { setFieldValue, values, errors } = form
  const { name, fullWidth } = inputProps
  if (!inputProps.placeholder) {
    inputProps.placeholder = intl.formatMessage({
      id: `${name}.placeholder`.toLowerCase()
    })
  }

  return (
    <FormControl className={classes?.root} fullWidth={fullWidth}>
      <Label htmlFor={name}>
        {intl.formatMessage({ id: label || name.toLowerCase() })}
      </Label>
      <Input
        {...inputProps}
        value={values[name]}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setFieldValue(name, target.value)
        }
      />
      <FormHelperText error={true}>{errors[name]}</FormHelperText>
    </FormControl>
  )
}

TextField.defaultProps = {
  fullWidth: true,
  type: 'text'
}

export default TextField
