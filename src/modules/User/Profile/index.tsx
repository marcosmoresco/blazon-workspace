import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl, IntlShape } from 'react-intl'
import useStyles from './styles'
import CardScreen from '@components/CardScreen'
import { Avatar, Grid, Typography } from '@material-ui/core'
import Key from '@icons/Key'
import { useRouter } from 'next/router'
import User from '@icons/User'
import Listing from '@components/Listing'
import ListingItem from '@components/Listing/ListingItem'
import InfoIcon from '@icons/Info'
import SignOutIcon from '@icons/SignOut'
import Divider from '@components/Divider'
import PencilIcon from '@icons/Pencil'

type ProfileProps = {
  intl: IntlShape
  classes: any
}

const UserActionListing = withStyles(() => ({
  root: {
    paddingLeft: 40
  }
}))(Listing)

const MenuListing = withStyles(() => ({
  root: {
    paddingTop: 24,
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: '#F4F4F5',
    borderRadius: 8,
    height: '100%'
  }
}))(Listing)

const Profile: FC<ProfileProps> = ({ classes, intl }) => {
  const router = useRouter()
  return (
    <CardScreen title='profile' icon={<User height={24} width={24} />}>
      <Grid container>
        <Grid container className={classes.userBox}>
          <Grid item xs={4}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
              className={classes.userInfo}
            >
              <Grid item xs={4}>
                <Avatar src='/Avatar.svg' className={classes.avatar}></Avatar>
              </Grid>
              <Grid item xs={8}>
                <Typography noWrap className={classes.userTitle}>
                  Design
                </Typography>
                <Typography noWrap className={classes.userName}>
                  Mateus David
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
            <UserActionListing title='profile.login'>
              <ListingItem
                label='profile.login.changepassword'
                subtitle='profile.login.changepassword.subtitle'
                icon={<Key width={21} height={21} color='#FFFFFF' />}
                iconBg='#0E46D7'
                action={() => router.push('/profile/change-password')}
              />
            </UserActionListing>
          </Grid>
          <Grid item xs={4}>
            <UserActionListing title='profile.options'>
              <ListingItem
                label='profile.options.suport.blazon'
                icon={<InfoIcon width={21} height={21} color='#FFFFFF' />}
                iconBg='#9D7230'
                action={() => router.push('https://docs.blazon.im/')}
              />
              <ListingItem
                label='profile.options.exit'
                icon={<SignOutIcon width={21} height={21} color='#FFFFFF' />}
                iconBg='#FF134A'
                action={() => router.push('/profile/change-password')}
              />
            </UserActionListing>
          </Grid>
        </Grid>
        <Divider />
        <Grid container className={classes.menuBoxes} spacing={4}>
          <Grid item xs={6}>
            <MenuListing title='profile.accounts'>
              <ListingItem
                label='profile.accounts.shared'
                action={() => router.push('/profile/access/shared')}
              />
              <ListingItem
                label='profile.accounts.temporary'
                action={() => router.push('/profile/access/temporary')}
              />
              <ListingItem
                label='profile.accounts.application'
                action={() => router.push('/profile/access/application')}
              />
              <ListingItem
                label='profile.accounts.regular'
                action={() => router.push('/profile/access/regular')}
              />
              <ListingItem
                label='profile.accounts.adminstrative'
                action={() => router.push('/profile/access/adminstrative')}
              />
            </MenuListing>
          </Grid>
          <Grid item xs={6}>
            <MenuListing title='profile.others'>
              <ListingItem
                label='profile.accounts.roles'
                action={() => router.push('/profile/access/roles')}
              />
              <ListingItem
                label='profile.accounts.entitlements'
                action={() => router.push('/profile/access/entitlements')}
              />
            </MenuListing>
          </Grid>
        </Grid>
      </Grid>
    </CardScreen>
  )
}

export default withStyles(useStyles)(injectIntl(Profile))
