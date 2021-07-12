import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import UserAccess from '@modules/User/UserAccess'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  content: {}
}))

export default function Index() {
  const classes = useStyles()

  const router = useRouter()
  const { name } = router.query

  return (
    <div className='App'>
      <div className={classes.content}>
        <UserAccess type={name} />
      </div>
    </div>
  )
}
