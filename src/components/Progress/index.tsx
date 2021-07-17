import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles((theme) => ({    
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > div': {
      textAlign: 'center',
      margin: '50px 0'
    },
  }
}))

export default function CustomizedProgress() {
  
    const classes = useStyles()          

    return (      
      <div className={classes.root}>
        <div>
          <CircularProgress />          
        </div>    
      </div>                                                           
    )
} 