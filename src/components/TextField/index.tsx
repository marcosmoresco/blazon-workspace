import React, { ChangeEvent, FC } from 'react'
import { useIntl } from 'react-intl'

import {
  FormControl,
  FormHelperText,
  InputProps,
  TextField as MuiTextField,
  withStyles
} from '@material-ui/core'
import { FormikProps, useFormikContext } from 'formik'
import { Label } from './styles'
import { get } from 'lodash'

export interface TextFieldProps extends InputProps {
  name: string
  label?: string
  form?: FormikProps<any>
  classes?: any
  hideLabel?: boolean
}

export const WhiteMuiTextField = withStyles(() => ({
  root: {
    backgroundColor: '#FFFFFF'
  }
}))(MuiTextField)

const TextField: FC<TextFieldProps> = ({
  label,
  form,
  classes,
  hideLabel,
  className,
  ...inputProps
}) => {
  const intl = useIntl()
  const formHook = useFormikContext()
  const finalForm = form || formHook
  const { setFieldValue, values, errors, touched } = finalForm
  const { name, fullWidth } = inputProps

  const labelText = hideLabel
    ? ''
    : label || intl.formatMessage({ id: name.toLowerCase() })

  if (inputProps.placeholder) {
    inputProps.placeholder = intl.formatMessage(
      {
        id: inputProps.placeholder
      },
      { labelText }
    )
  }

  return (
    <FormControl
      className={`${classes?.root} ${className || ''} `}
      fullWidth={fullWidth}
    >
      <Label htmlFor={name} hidden={hideLabel}>
        {labelText}
      </Label>
      <WhiteMuiTextField
        value={get(values, name)}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
          setFieldValue(name, target.value)
        }}
        InputProps={inputProps}
        variant='outlined'
      />
      <FormHelperText error={true}>{get(errors, name)}</FormHelperText>
    </FormControl>
  )
}

TextField.defaultProps = {
  fullWidth: true,
  type: 'text',
  hideLabel: false
}

export default TextField
