import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PasswordVaultScreen from '@modules/PasswordVaultScreen'

const useStyles = makeStyles(() => ({
  content: {}
}))

export default function Index() {
  const classes = useStyles()

  return (
    <div className='App'>
      <div className={classes.content}>
        <PasswordVaultScreen />
      </div>
    </div>
  )
}
