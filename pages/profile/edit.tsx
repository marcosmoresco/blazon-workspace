import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import EditProfile from '@modules/User/EditProfile'

const useStyles = makeStyles(() => ({
  content: {}
}))

export default function Index() {
  const classes = useStyles()

  return (
    <div className='App'>
      <div className={classes.content}>
        <EditProfile />
      </div>
    </div>
  )
}
