import { Avatar, Grid } from '@material-ui/core'
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import moment from 'moment'
import 'moment/locale/pt'
import 'moment/locale/en-in'
import {
  ReadNotification,
  UnreadNotification,
  NotificationDate,
  NotificationContent
} from './styles'
import { NotificationItemProps } from './types'

const fixDate = (date: string) => date.replace(/min.+/g, 'min')

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  const intl = useIntl()
  const { user, content, ocurrence, read } = notification
  const fullName = user.username.split(' ')
  const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0)

  const Notification = read ? ReadNotification : UnreadNotification

  return (
    <Notification>
      <Grid container>
        <Grid item xs={1}>
          <Avatar alt={user.username}>{initials.toUpperCase()}</Avatar>
        </Grid>
        <Grid item xs={9}>
          <NotificationContent dangerouslySetInnerHTML={{ __html: content }} />
        </Grid>
        <Grid item xs={2}>
          <NotificationDate>
            {fixDate(moment(ocurrence).locale(intl.locale).fromNow(true))}
          </NotificationDate>
        </Grid>
      </Grid>
    </Notification>
  )
}

export default NotificationItem
