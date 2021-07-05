import React, { FC, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import Button from '@components/Button'
import X from '@icons/X'
import type { TutorialProps } from './types'
import useStyles from './styles'

const Tutorial:FC<TutorialProps> = ({classes, intl}) => {  

  return (
    <div className={classes.root}>
      <div className={classes.headerTutorial}>
        <div>
          <div className={classes.headerTutorialWelcomeText}>
            {intl.formatMessage({id: 'home.tutorial.title'})}
          </div>
          <div className={classes.headerTutorialWelcomeSubText}>
            {intl.formatMessage({id: 'home.tutorial.text'})}  
          </div>           
        </div> 
        <Button variant="contained" color="primary">
          {intl.formatMessage({id: 'home.tutorial.button'})}
        </Button>
        <span className={classes.close}>
          <X width={20} height={20}/>
        </span>          
      </div>      
    </div>
  )
  
}

export default withStyles(useStyles)(injectIntl(Tutorial))