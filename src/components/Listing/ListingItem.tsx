import CaretRightIcon from '@icons/CaretRight'
import ShareIcon from '@icons/Share'
import { withStyles } from '@material-ui/styles'
import React, { FC } from 'react'
import { injectIntl, IntlShape } from 'react-intl'
import useStyles from './styles'

type ListingItemProps = {
  intl: IntlShape
  classes: any
  label: string
  subtitle?: string
  icon?: React.ReactNode
  action(): void
  iconBg?: string
}

const ListingItem: FC<ListingItemProps> = ({
  intl,
  classes,
  label,
  icon,
  iconBg,
  subtitle,
  action
}) => {
  return (
    <div className={`${classes.listingRow} hover-effect`} onClick={action}>
      <div className={classes.accountsContentInfo}>
        <div
          className={classes.accountsContentInfoIcon}
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
        <div>
          <div>
            {intl.formatMessage({
              id: label
            })}
          </div>
          <div className='subTitle'>
            {subtitle &&
              intl.formatMessage({
                id: subtitle
              })}
          </div>
        </div>
      </div>
      {!!action && <CaretRightIcon width={21} height={21} />}
    </div>
  )
}

ListingItem.defaultProps = {
  icon: <ShareIcon width={21} height={21} color='#FFFFFF' />,
  iconBg: '#1A202B'
}

export default withStyles(useStyles)(injectIntl(ListingItem))
