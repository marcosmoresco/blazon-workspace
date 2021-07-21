import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      '& .hover-effect:hover': {
        backgroundColor: '#E9E8EB'
      }
    },
    title: {
      fontSize: 16,
      fontWeight: 500,
      paddingLeft: 8
    },
    accounts: {
      paddingTop: 8
    },
    listingRow: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 8,
      paddingTop: 8,
      paddingLeft: 8,
      paddingRight: 8
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
