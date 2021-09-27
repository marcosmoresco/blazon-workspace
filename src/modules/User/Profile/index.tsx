import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl, IntlShape } from 'react-intl'
import useStyles from './styles'
import CardScreen from '@components/CardScreen'
import { Avatar, Grid, Typography } from '@material-ui/core'
import SharedAccountIcon from "@icons/SharedAccount";
import ApplicationAccountIcon from "@icons/ApplicationAccount";
import RegularAccountIcon from "@icons/RegularAccount";
import AdministrativeAccountIcon from "@icons/AdministrativeAccount";
import DeviceMobileIcon from "@icons/DeviceMobile";
import TemporaryAccountIcon from "@icons/Watch";
import CheckCircleIcon from "@icons/CheckCircle";
import PeopleIcon from "@icons/People";
import Key from "@icons/Key";
import EnvelopeIcon from "@icons/Envelope";
import PhoneIcon from "@icons/Phone";
import ChatsCircleIcon from "@icons/ChatsCircle";
import { useRouter } from 'next/router'
import User from '@icons/User'
import Listing from '@components/Listing'
import ListingItem from '@components/Listing/ListingItem'
import InfoIcon from '@icons/Info'
import SignOutIcon from '@icons/SignOut'
import Divider from '@components/Divider'
import PencilIcon from '@icons/Pencil'
import { useUser } from "@hooks";
import { useTheme, themes } from '@theme/index'
import { CHECKOUT_ADMIN_ACCOUNT } from "@modules/User/mutations";
import KeyIcon from '@icons/Key'

type ProfileProps = {
  intl: IntlShape
  classes: any
}

const BoxListing = withStyles(() => ({
  root: {
    backgroundColor: '#F4F4F5',
    borderRadius: 8,
    paddingTop: 24,
    paddingBottom: 24,
    minHeight: "100%"
  },
  title: {
    paddingLeft: 32,
    paddingRight: 32
  }
}))(Listing)

const BoxListingItem = withStyles(() => ({
  listingRow: {
    paddingLeft: 32,
    paddingRight: 32
  }
}))(ListingItem)

const Profile: FC<ProfileProps> = ({ classes, intl }) => {
  
  const [user, thumb] = useUser();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const currentTheme = themes[theme];
  
  return (
    <>      
      <CardScreen title='profile' icon={<User height={24} width={24} onBack={() => router.push("/")}/>}>      
        <Grid container>
          <Grid container className={classes.userBox} spacing={5}>
            <Grid item xs={4}>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
                className={classes.userInfo}
              >
                <Grid item xs={4}>
                  <Avatar src={thumb} className={classes.avatar}></Avatar>
                </Grid>
                <Grid item xs={8}>
                  <Typography noWrap className={classes.userTitle}>
                    {user?.username}
                  </Typography>
                  <Typography noWrap className={classes.userName}>
                    {user?.displayName}
                  </Typography>
                  <Typography
                    noWrap
                    className={`${classes.editProfile} pointer`}
                    onClick={() => router.push('/profile/edit')}
                  >
                    <div className={classes.editProfileIcon}>
                      <PencilIcon color='#BBBDC0' width={16} height={16} />
                    </div>
                    <span className={classes.editProfileText}>
                      {intl.formatMessage({ id: 'profile.edit' })}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>              
            </Grid>
            <Grid item xs={4}>
              <Listing title='profile.options'>
                <ListingItem
                  label='profile.options.suport.blazon'
                  icon={<InfoIcon width={21} height={21} color='#FFFFFF' />}
                  iconBg='#9D7230'
                  action={() => window.open(`https://docs.blazon.im/`, '__blank')}
                />
                <ListingItem
                  label='profile.options.exit'
                  icon={<SignOutIcon width={21} height={21} color='#FFFFFF' />}
                  iconBg='#FF134A'
                  action={() => router.push('/logout')}
                />
              </Listing>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={4} className={classes.box}>
            <Grid item xs={4}>
              <div>
                <BoxListing title='profile.accounts'>
                  <BoxListingItem
                    label='profile.accounts.regular'
                    action={() => router.push('/profile/access/regular')}
                    icon={<RegularAccountIcon color="#FFFFFF"/>}
                  />
                   <BoxListingItem
                    label='profile.accounts.temporary'
                    action={() => router.push('/profile/access/temporary')}
                    icon={<TemporaryAccountIcon color="#FFFFFF" width={23}/>}
                  />
                  <BoxListingItem
                    label='profile.accounts.shared'
                    action={() => router.push('/profile/access/shared')}
                    icon={<SharedAccountIcon color="#FFFFFF"/>}
                  />                 
                  <BoxListingItem
                    label='profile.accounts.application'
                    action={() => router.push('/profile/access/application')}
                    icon={<ApplicationAccountIcon color="#FFFFFF"/>}
                  />                  
                  <BoxListingItem
                    label='profile.accounts.adminstrative'
                    action={() => router.push('/profile/access/adminstrative')}
                    icon={<AdministrativeAccountIcon color="#FFFFFF"/>}
                  />
                </BoxListing>
              </div>{' '}
            </Grid>            
            <Grid item xs={4}>
              <BoxListing title='profile.others'>
                <BoxListingItem
                  label='profile.accounts.roles'
                  action={() => router.push('/profile/access/roles')}
                  icon={<PeopleIcon color="#FFFFFF" width={23}/>}
                />
                <BoxListingItem
                  label='profile.accounts.entitlements'
                  action={() => router.push('/profile/access/entitlements')}
                  icon={<CheckCircleIcon color="#FFFFFF" width={23}/>}
                />
              </BoxListing>
            </Grid>
            <Grid item xs={4}>
              <BoxListing title='profile.security'>
                <BoxListingItem
                  label='profile.changepassword'
                  action={() => router.push('/profile/change-password')}
                  icon={<KeyIcon color="#FFFFFF" width={23}/>}
                />
                <BoxListingItem
                  label='profile.changeemail'
                  action={() => router.push('/profile/change-email')}
                  icon={<EnvelopeIcon color="#FFFFFF" width={23}/>}
                />
                <BoxListingItem
                  label='profile.changephone'
                  action={() => router.push('/profile/change-phone')}
                  icon={<PhoneIcon color="#FFFFFF" width={23}/>}
                />
                <BoxListingItem
                  label='profile.googleauthenticator'
                  action={() => router.push('/profile/google-authenticator')}
                  icon={<DeviceMobileIcon color="#FFFFFF" width={23}/>}
                />
                 <BoxListingItem
                  label='profile.secretquestions'
                  action={() => router.push('/profile/secret-questions')}
                  icon={<ChatsCircleIcon color="#FFFFFF" width={23}/>}
                />
              </BoxListing>
            </Grid>
          </Grid>
        </Grid>
      </CardScreen>
    </>  
  )
}

export default withStyles(useStyles)(injectIntl(Profile))
