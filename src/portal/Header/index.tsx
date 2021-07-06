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
import Switch from '@material-ui/core/Switch'
import Logo from '../../logo.svg'
import SearchIcon from '@icons/Search'
import PaperPlaneTiltIcon from '@icons/PaperPlaneTilt'
import KeyIcon from '@icons/Key'
import ShoppingCartSimpleIcon from '@icons/ShoppingCartSimple'
import NoteBlankIcon from '@icons/NoteBlank'
import BellSimpleIcon from '@icons/BellSimple'
import CaretDownIcon from '@icons/CaretDown'
import CaretRightIcon from '@icons/CaretRight'
import UserIcon from '@icons/User'
import InfoIcon from '@icons/Info'
import SignOutIcon from '@icons/SignOut'
import Message from '../Message'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useTheme, themes } from '../../theme'
import type { HeaderProps } from './types'
import useStyles from './styles'

const Header: FC<HeaderProps> = ({classes, intl}) => {

  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openProfile, setOpenProfile] = useState(false)
  const [darkMode, setDarkMode] = useState(false)  
  
  const {theme, setTheme} = useTheme()
  const currentTheme = themes[theme]
  if(typeof window !== 'undefined') {
    const body = window.document.querySelector('body')
    if(body) {
      body.style.backgroundColor = currentTheme.palette.background.default
    }    
  }

  const handleClick = (event:any) => {    
    setAnchorEl(event.currentTarget)
    setOpenProfile(!openProfile)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenProfile(false)
  }

  const changeTheme = (event:any) => {
    setDarkMode(event.target.checked)
    setTheme(event.target.checked && 'black' || 'light')       
  }

  return (
    <div>
      <Message />
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.logoSearchInput}>
            <div className="pointer" onClick={() =>  router.push('/')}>
              <Image src={Logo} alt="Logo" />                          
            </div>
            <OutlinedInput
              className={classes.searchInput}
              id="header-search"
              placeholder={intl.formatMessage({id: "search"})}
              onClick={() =>  router.push('/search')}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon width={24} height={24} color="#60636A"/>                     
                </InputAdornment>
              }
              labelWidth={0}
            />
          </div>           
          <div className={classes.menuOptionsContent}>
            <div className={classes.menuOptions}>
              <div className={classes.optionImage}>
                <PaperPlaneTiltIcon width={18} height={18} color={currentTheme.overrides.MuiIcon.root.color} />
              </div>
              <div className={classes.optionImage}>
                <KeyIcon width={18} height={18} color={currentTheme.overrides.MuiIcon.root.color} />                  
              </div>
              <div className={classes.optionImage}>                 
                <ShoppingCartSimpleIcon width={18} height={18} color={currentTheme.overrides.MuiIcon.root.color} />
              </div>
              <div className={classes.optionImage}>
                <NoteBlankIcon width={18} height={18} color={currentTheme.overrides.MuiIcon.root.color} />
              </div>
              <div className={classes.optionImage}>
                <BellSimpleIcon width={18} height={18} color={currentTheme.overrides.MuiIcon.root.color} /> 
              </div> 
            </div> 
            <Button 
              className="Button-avatar" 
              onClick={handleClick} 
              endIcon={<CaretDownIcon width={20} height={20}/>}
              aria-controls={openProfile ? 'menu-list-grow' : undefined}
              aria-haspopup="true">
              <Avatar    
                src='/Avatar.svg'
              />
            </Button>             
          </div>            
        </Toolbar>
      </AppBar>
      <Popper open={openProfile} anchorEl={anchorEl} role={undefined} transition disablePortal style={{zIndex: 2}}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.menuList}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList 
                  autoFocusItem={openProfile} 
                  id="menu-list-grow">
                  <MenuItem>
                    <div className={classes.menuItem}>
                      <div className={`${classes.menuImage} blue`}>
                        <UserIcon width={20} height={20} color="#FFFFFF"/>   
                      </div>                                               
                      {intl.formatMessage({id: "profile"})}
                    </div> 
                    <div className={classes.caretRight}>
                      <CaretRightIcon width={20}/>
                    </div>                      
                  </MenuItem>
                  <Divider /> 
                  <MenuItem onClick={() => window.open(`https://docs.blazon.im/`, '__blank')}>
                    <div className={classes.menuItem}>
                      <div className={`${classes.menuImage} yellow`}>
                        <InfoIcon width={20} height={20} color="#FFFFFF"/>  
                      </div>                                               
                      {intl.formatMessage({id: "suport.blazon"})}
                    </div> 
                    <div className={classes.caretRight}>
                      <CaretRightIcon width={20}/> 
                    </div>                      
                  </MenuItem>
                  <MenuItem>
                    <div className={classes.menuItem}>
                      <div className={`${classes.menuImage} red`}>
                        <SignOutIcon width={20} height={20} color="#FFFFFF"/>                          
                      </div>                          
                      {intl.formatMessage({id: "logout"})}
                    </div> 
                    <div className={classes.caretRight}>
                      <CaretRightIcon width={20}/>  
                    </div>                                           
                  </MenuItem>
                  <MenuItem>
                    <div className={classes.darkMode}>
                      <div className={classes.darkModeText}>
                      {intl.formatMessage({id: "darkMode"})}
                      </div>
                      <div className={classes.darkModeSwitch}>
                        <Switch
                          color="primary"
                          checked={darkMode}
                          onChange={changeTheme}
                          name="checkedA"
                        />
                      </div>
                    </div>
                  </MenuItem> 
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}  
      </Popper>                    
    </div>
  )  
}

export default withStyles(useStyles)(injectIntl(Header))
