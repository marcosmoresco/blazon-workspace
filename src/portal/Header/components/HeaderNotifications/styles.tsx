import { styled as styledMui } from '@material-ui/core/styles'
import MuiDivider from '@material-ui/core/Divider'
import MuiBadge from '@material-ui/core/Badge'
import styled from 'styled-components'

export const UnreadNotification = styled.div`
  padding: 16px 24px 16px 24px;
  background-color: #e9e8eb;
  font-color: #1b202a;
  font-size: 16px;
`

export const ReadNotification = styled.div`
  padding: 16px 24px 16px 24px;
  font-color: #1b202a;
  font-size: 16px;
`

export const NotificationGroup = styled.div`
  padding: 32px 24px 16px 24px;
  font-size: 16px;
  color: #26213f;
`

export const NotificationContent = styled.div`
  display: inline-block;
  margin-left: 12px;
  max-width: 308px;
`

export const NotificationDate = styled.div`
  text-align: right;
`

export const LoadMoreContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 30px;
`;

export const Badge = styledMui(MuiBadge)({
  '& .MuiAvatar-root': {
    width: 20,
    height: 20,
    fontSize: 12,
    borderRadius: 10
  }
})

export const NotificationsBox = styled.div`
  min-width: 500px;  
`

export const NotificationsHeader = styled.div`
  padding: 24px 24px 0 24px;
`

export const HeaderDivider = styledMui(MuiDivider)({
  margin: '15px -26px 0 -26px'
})

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.div`
  color: #1b202a;
  font-size: 21px;
  font-weight: 500;
  line-height: 21px;
`

export const CloseHeader = styled.div`
  cursor: pointer;
`

export const CenterAlign = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`
