
import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme:Theme) => createStyles({
  root: {      
    height: 33,
    background: '#DCDEE0',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%'
  },  
})

export default useStyles