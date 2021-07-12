import { withStyles } from '@material-ui/core'
import React, { FC } from 'react'
import { injectIntl, IntlShape } from 'react-intl'
import useStyles from './styles'

type ListingProps = {
  intl: IntlShape
  classes: any
  children: React.ReactNode
  title: string
}

const Listing: FC<ListingProps> = ({ intl, classes, children, title }) => {
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {intl.formatMessage({
          id: title
        })}
      </div>
      <div className={classes.accounts}>{children}</div>
    </div>
  )
}

export default withStyles(useStyles)(injectIntl(Listing))
