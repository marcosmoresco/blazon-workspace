import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ChangePassword from '@modules/User/ChangePassword'

const useStyles = makeStyles(() => ({
  content: {}
}))

export default function Index() {
  const classes = useStyles()

  return (
    <div className='App'>
      <div className={classes.content}>
        <ChangePassword />
      </div>
    </div>
  )
}
