import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme: Theme) =>
  createStyles({
    root: {},
    title: {
      fontSize: 16,
      fontWeight: 500
    },
    accounts: {
      paddingTop: 24
    },
    accountsContent: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 16
    },
    accountsContentInfo: {
      display: 'flex',
      alignItems: 'center',
      '& .subTitle': {
        fontSize: 12
      }
    },
    accountsContentInfoIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      strokeWidth: 2,
      marginRight: 12,
      width: 32,
      height: 32
    }
  })

export default useStyles
