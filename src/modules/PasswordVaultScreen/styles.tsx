import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme: Theme) =>
  createStyles({
    passwordVault: {
      margin: '42px 64px',
      '& > .title': {
        fontWeight: 600,
        fontSize: 21,
        color: '#26213F'
      },
      '& > .subtitle': {
        fontWeight: 400,
        fontSize: 18,
        color: '#676378'
      },
      '& .newPasswordButton': {
        backgroundColor: '#FFFFFF',
        fontWeight: 400,
        fontSize: 16,
        '& div': {
          marginLeft: 8
        }
      },
      '& .loadMore': {
        textAlign: 'center'
      }
    }
  })

export default useStyles
