import React, { FC, useState } from 'react'

import { IconButton, InputAdornment } from '@material-ui/core'
import EyeSlashIcon from '@icons/EyeSlash'
import EyeIcon from '@icons/Eye'
import TextField, { TextFieldProps } from '@components/TextField'

const PasswordField: FC<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  const type = showPassword ? 'text' : 'password'

  if (true) {
    return (
      <TextField
        {...props}
        type={type}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    )
  }
}

export default PasswordField
