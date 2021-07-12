import React, { ChangeEvent, FC, useState } from 'react'

import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { FormikProps } from 'formik'
import EyeSlashIcon from '@icons/EyeSlash'
import EyeIcon from '@icons/Eye'

type PasswordFieldProps = {
  name: string
  label: string
  placeholder: string
  fullWidth?: boolean
  form: FormikProps<any>
  classes?: any
}

const PasswordField: FC<PasswordFieldProps> = ({
  name,
  label,
  placeholder,
  form,
  fullWidth = true,
  classes
}) => {
  const { setFieldValue, values, errors } = form
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setFieldValue(name, target.value)

  return (
    <FormControl className={classes?.root} fullWidth={fullWidth}>
      <label htmlFor={name}>{label}</label>
      <OutlinedInput
        fullWidth={fullWidth}
        name={name}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        value={values[name]}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={true}>{errors[name]}</FormHelperText>
    </FormControl>
  )
}

export default PasswordField
