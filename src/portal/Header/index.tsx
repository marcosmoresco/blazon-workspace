import React, { FC, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import { useRouter } from 'next/router'

import Image from 'next/image'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import RequestsIcon from '@icons/Requests'
import KeyIcon from '@icons/Key'
import TasksIcon from '@icons/Tasks'
import CaretDownIcon from '@icons/CaretDown'
import CaretRightIcon from '@icons/CaretRight'
import UserIcon from '@icons/User'
import InfoIcon from '@icons/Info'
import SignOutIcon from '@icons/SignOut'
import Message from '@portal/Message/index'
import Cart from '@portal/Cart/index'
import Tooltip from '@components/Tooltip'

import { useUser } from '@hooks'
import { useTheme, themes } from '../../theme'
import type { HeaderProps } from './types'
import HeaderAutocomplete from './components/HeaderAutocomplete'
import HeaderRequestCart from './components/HeaderRequestCart'
import HeaderNotifications from './components/HeaderNotifications'
import { useStyles, HeaderProfileBox, HeaderProfileBoxInfo, HeaderFixAutocomplete } from './styles'

const Header: FC<HeaderProps> = ({ classes, intl }) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openProfile, setOpenProfile] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const [user, thumb] = useUser()
  const { theme, setTheme } = useTheme()
  const currentTheme = themes[theme]
  if (typeof window !== 'undefined') {
    const body = window.document.querySelector('body')
    if (body) {
      body.style.backgroundColor = currentTheme.palette.background.default
    }
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
    setOpenProfile(!openProfile)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenProfile(false)
  }

  const changeTheme = (event: any) => {
    setDarkMode(event.target.checked)
    setTheme((event.target.checked && 'dark') || 'light')
  }

  return (
    <div>
      <Cart />
      <Message />
      <AppBar position='static' className={classes.root}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.logoSearchInput}>
            <div className={classes.menuLogo} onClick={() => router.push('/')}>
              <img src="/api/logo" alt="Logo" />
            </div>
            {!['/search', '/checkout', '/checkout-finishing', '/checkout-finished'].includes(router.pathname) && (
              <HeaderAutocomplete classes={classes} />
            ) || <HeaderFixAutocomplete />}
          </div>
          <div className={classes.menuOptionsContent}>
            {!['/checkout', '/checkout-finishing', '/checkout-finished'].includes(router.pathname) && (
              <div className={classes.menuOptions}>
                <Tooltip
                  title={intl.formatMessage({ id: 'requests' })}
                  placement='bottom'
                >
                  <div
                    className={`${classes.optionImage} ${
                      router.pathname === '/requests' && 'Active'
                    }`}
                    onClick={() => router.push('/requests')}
                  >
                    <RequestsIcon
                      width={21}
                      height={21}
                      color={
                        (router.pathname === '/requests' && '#0E46D7') ||
                        currentTheme.overrides.MuiIcon.root.color
                      }
                    />
                  </div>
                </Tooltip>
                <Tooltip
                  title={intl.formatMessage({ id: 'passwordVault' })}
                  placement='bottom'
                >
                  <div
                    className={`${classes.optionImage} ${
                      router.pathname === '/password-vault' && 'Active'
                    }`}
                    onClick={() => router.push('/password-vault')}
                  >
                    <KeyIcon
                      width={21}
                      height={21}
                      color={currentTheme.overrides.MuiIcon.root.color}
                    />
                  </div>
                </Tooltip>
                <HeaderRequestCart
                  currentTheme={currentTheme}
                  classes={classes}
                />
                <Tooltip
                  title={intl.formatMessage({ id: 'tasks' })}
                  placement='bottom'
                >
                  <div
                    className={`${classes.optionImage} ${
                      router.pathname === '/tasks' && 'Active'
                    }`}
                    onClick={() => router.push('/tasks')}
                  >
                    <TasksIcon
                      width={21}
                      height={21}
                      color={
                        (router.pathname === '/tasks' && '#0E46D7') ||
                        currentTheme.overrides.MuiIcon.root.color
                      }
                    />
                  </div>
                </Tooltip>
                <HeaderNotifications
                  currentTheme={currentTheme}
                  classes={classes}
                />
              </div>
            )}            
            <Button
              className='Button-avatar'
              onClick={handleClick}
              endIcon={<CaretDownIcon width={20} height={20} />}
              aria-controls={openProfile ? 'menu-list-grow' : undefined}
              aria-haspopup='true'
            >
              <HeaderProfileBox>
                <Avatar src={thumb} />
                <HeaderProfileBoxInfo>
                  <div className='Username'>{user?.username}</div>
                  <div className='FirstName'>{user?.firstName}</div>
                </HeaderProfileBoxInfo>
              </HeaderProfileBox>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Popper
        open={openProfile}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 3 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper className={classes.menuList}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={openProfile} id='menu-list-grow'>
                  <MenuItem
                    onClick={() => {
                      setOpenProfile(false);
                      setAnchorEl(null);
                      router.push('/profile');
                      return true;
                    }}
                  >
                    <div className={classes.menuItem}>
                      <div className={`${classes.menuImage} blue`}>
                        <UserIcon width={20} height={20} color='#FFFFFF' stroke={2}/>
                      </div>
                      {intl.formatMessage({ id: 'profile' })}
                    </div>
                    <div className={classes.caretRight}>
                      <CaretRightIcon width={20} />
                    </div>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() =>
                      window.open(`https://docs.blazon.im/`, '__blank')
                    }
                  >
                    <div className={classes.menuItem}>
                      <div className={`${classes.menuImage} yellow`}>
                        <InfoIcon width={20} height={20} color='#FFFFFF' stroke={2}/>
                      </div>
                      {intl.formatMessage({ id: 'suport.blazon' })}
                    </div>
                    <div className={classes.caretRight}>
                      <CaretRightIcon width={20} />
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/logout">
                      <div className={classes.menuItem}>
                        <div className={`${classes.menuImage} red`}>
                          <SignOutIcon width={20} height={20} color='#FFFFFF' stroke={2}/>
                        </div>
                        {intl.formatMessage({ id: 'logout' })}
                      </div>
                      <div className={classes.caretRight}>
                        <CaretRightIcon width={20} />
                      </div>
                    </Link>                    
                  </MenuItem>
                  {/*<MenuItem>
                    <div className={classes.darkMode}>
                      <div className={classes.darkModeText}>
                        {intl.formatMessage({ id: 'darkMode' })}
                      </div>
                      <div className={classes.darkModeSwitch}>
                        <Switch
                          color='primary'
                          checked={darkMode}
                          onChange={changeTheme}
                          name='checkedA'
                        />
                      </div>
                    </div>
                  </MenuItem>*/}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default withStyles(useStyles, { name: "MuiCustomHeader" })(injectIntl(Header))
