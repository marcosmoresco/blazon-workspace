import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme: Theme) =>
  createStyles({
    forgetPassword: {
      textAlign: 'right',
      fontSize: 14,
      color: '#1377D5',
      paddingBottom: 32
    },
    form: {
      padding: 24
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
    }
  })

export default useStyles
