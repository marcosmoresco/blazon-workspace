import { createStyles, Theme } from '@material-ui/core/styles'
import { BackgroundColor } from 'chalk'

const useStyles = (theme: Theme) =>
  createStyles({
    title: {
      fontSize: 18,
      fontWeight: 600,
      paddingBottom: 12
    },
    description: {
      fontSize: 16,
      fontWeight: 400
    },
    header: {
      padding: '24px 24px'
    },
    userHeaderBg: {
      height: 151,
      backgroundImage: `url(../profile-bg-${theme.palette.profileBg || "blue"}.png)`,
      backgroundPosition: 'left',
      textAlign: 'center'
    },
    userHeader: {
      paddingBottom: 93 + 64 // 64 is figma size
    },
    avatar: {
      height: 200,
      width: 200,
      position: 'relative',
      top: 44,
      margin: '0 auto',
      zIndex: 1
    },
    avatarAction: {
      top: 243,
      position: 'relative',
      margin: '0 auto',
      zIndex: 2
    },
    uploadImageTitle: {
      fontWeight: 600,
      fontSize: 18
    },
    uploadImageDescription: {
      fontWeight: 400,
      fontSize: 16
    },
    center: {
      textAlign: 'center'
    },
    avatarDialog: {
      width: 600
    },
    avatarContainer: {
      paddingBottom: 32
    },
    avatarSelectorComponent: {
      '& div': {
        margin: '0 auto',
        '& > div': {
          backgroundColor: '#E9E8EB'
        }
      },
      '& label': {
        paddingTop: 20
      }
    },
    category: {
      fontWeight: 600,
      fontSize: 18,
      lineHeight: "100%",
      color: "#1B202A",
      "&.Top": {
        marginTop: 24,
      }
    },
    editButton: {
      cursor: "pointer"
    }   
  })

export default useStyles
