import React, { FC, useState, useEffect } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Drawer from '@material-ui/core/Drawer'
import Tooltip from '@components/Tooltip'
import BellSimpleIcon from '@icons/BellSimple'
import XIcon from '@icons/X'
import type { HeaderNotificationsProps } from './types'
import moment from 'moment'
import {
  Badge,
  NotificationsBox,
  NotificationsHeader,
  Header,
  HeaderTitle,
  HeaderDivider,
  CloseHeader,
  NotificationGroup
} from './styles'
import useMockRequest from '@utils/mockRequest'
import Loading from '@components/Loading'
import NotificationItem from './NotificationItem'

const mockData = [
  {
    content: '<b>Peter Parker</b> aprovou seu acesso a <b>VPNSS</b>',
    read: false,
    user: {
      username: 'Peter Parker'
    },
    ocurrence: moment(new Date()).subtract(2, 'minutes').toDate()
  },
  {
    content: '<b>Lucas Henrique</b> reprovou seu acesso a <b>Facebook</b>...',
    read: true,
    user: {
      username: 'Lucas Sousa'
    },
    ocurrence: moment(new Date()).subtract(30, 'minutes').toDate()
  },
  {
    content: '<b>Lucas Henrique</b> reprovou seu acesso a <b>Facebook</b>...',
    read: false,
    user: {
      username: 'Lucas Sousa'
    },
    ocurrence: moment(new Date()).subtract(1, 'hours').toDate()
  },
  {
    content: '<b>Peter Parker</b> aprovou seu acesso a <b>VPNSS</b>',
    read: false,
    user: {
      username: 'Peter Parker'
    },
    ocurrence: moment(new Date()).subtract(2, 'hours').toDate()
  },
  {
    content: '<b>Peter Parker</b> aprovou seu acesso a <b>VPNSS</b>',
    read: true,
    user: {
      username: 'Peter Parker'
    },
    ocurrence: moment(new Date()).subtract(1, 'day').toDate()
  },
  {
    content: '<b>Peter Parker</b> aprovou seu acesso a <b>VPNSS</b>',
    read: false,
    user: {
      username: 'Peter Parker'
    },
    ocurrence: moment(new Date()).subtract(1, 'day').toDate()
  },
  ,
  {
    content: '<b>Peter Parker</b> aprovou seu acesso a <b>VPNSS</b>',
    read: false,
    user: {
      username: 'Peter Parker'
    },
    ocurrence: moment(new Date()).subtract(2, 'day').toDate()
  },
  {
    content: '<b>Peter Parker</b> aprovou seu acesso a <b>VPNSS</b>',
    read: true,
    user: {
      username: 'Peter Parker'
    },
    ocurrence: moment(new Date()).subtract(2, 'day').toDate()
  }
]

const HeaderNotifications: FC<HeaderNotificationsProps> = ({
  intl,
  classes,
  currentTheme
}) => {
  const { loading, data } = useMockRequest(mockData)

  const [open, setOpen] = useState(false)

  let groups = {}

  if (data) {
    const today = moment().startOf('day')
    const tomorrow = moment().add(-1, 'day').startOf('day')

    data.map((notification: any) => {
      const ocurrence = moment(notification.ocurrence)
      let group
      if (ocurrence.isAfter(today)) {
        group = intl.formatMessage({ id: 'dates.today' })
      } else if (ocurrence.isAfter(tomorrow)) {
        group = intl.formatMessage({ id: 'dates.tomorrow' })
      } else {
        group = intl.formatDate(ocurrence.toDate(), {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: '2-digit'
        })
      }
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(notification)
    })
  }

  return (
    <>
      <Tooltip
        title={intl.formatMessage({ id: 'notifications' })}
        placement='bottom'
      >
        <Badge
          color='primary'
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <div className={classes.optionImage} onClick={() => setOpen(true)}>
            <BellSimpleIcon
              width={21}
              height={21}
              color={currentTheme.overrides.MuiIcon.root.color}
            />
          </div>
        </Badge>
      </Tooltip>
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <NotificationsBox>
          <NotificationsHeader>
            <Header>
              <HeaderTitle>
                <FormattedMessage id='notifications' />
              </HeaderTitle>
              <CloseHeader onClick={() => setOpen(false)}>
                <XIcon />
              </CloseHeader>
            </Header>
            <HeaderDivider />
          </NotificationsHeader>
        </NotificationsBox>
        {loading ? (
          <Loading container={true} />
        ) : (
          <div>
            {Object.keys(groups).map((key, index) => {
              const group = groups[key]
              return (
                <div key={index}>
                  <NotificationGroup>{key}</NotificationGroup>
                  <div>
                    {group.map((notification, key) => (
                      <NotificationItem notification={notification} key={key} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Drawer>
    </>
  )
}

export default injectIntl(HeaderNotifications)
