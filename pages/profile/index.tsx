import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Profile from '@modules/User/Profile'

const useStyles = makeStyles(() => ({
  content: {}
}))

export default function Index() {
  const classes = useStyles()

  return (
    <div className='App'>
      <div className={classes.content}>
        <Profile />
      </div>
    </div>
  )
}
