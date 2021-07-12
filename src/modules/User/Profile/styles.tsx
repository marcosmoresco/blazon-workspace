import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme: Theme) =>
  createStyles({
    userBox: {
      backgroundColor: '#F4F4F5',
      padding: 24,
      marginLeft: 24,
      marginRight: 24,
      marginTop: 24,
      marginBottom: 32,
      borderRadius: 8
    },
    menuBox: {
      backgroundColor: '#F4F4F5',
      marginBottom: 55,
      borderRadius: 8
    },
    menuBoxes: {
      margin: 9
    },
    avatar: {
      height: 80,
      width: 80
    },
    userInfo: {
      padding: 24,
      backgroundColor: '#1B202A',
      borderRadius: 8
    },
    userTitle: {
      color: '#FFFFFF',
      fontSize: 16
    },
    userName: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold'
    },
    editProfile: {
      color: '#BBBDC0',
      fontSize: 16
    },
    editProfileIcon: {
      display: 'inline-block',
      paddingRight: 8,
      paddingTop: 2
    },
    editProfileText: {
      verticalAlign: 'top'
    },
    listingTitle: {
      fontSize: 16,
      fontWeight: 500
    }
  })

export default useStyles
