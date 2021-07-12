import { createStyles, Theme } from '@material-ui/core/styles'
import ProfileBackground from '../../../../public/profile-bg.jpg'

const useStyles = (theme: Theme) =>
  createStyles({
    formControl: {
      padding: 24,
      '& .MuiFormControl-root': {
        paddingTop: 16
      }
    },
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
      backgroundImage: 'url(../profile-bg.jpg)',
      backgroundPosition: 'left'
    },
    userHeader: {
      paddingBottom: 93 + 64 // 64 is figma size
    },
    avatar: {
      height: 200,
      width: 200,
      position: 'relative',
      top: 44,
      margin: '0 auto'
    }
  })

export default useStyles
