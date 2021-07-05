
import { createStyles, Theme } from '@material-ui/core/styles'

const useStyles = (theme:Theme) => createStyles({  
  headerTutorial: {
    marginTop: 32,
    background: '#E9E8EB',
    borderRadius: 8,
    padding: 42,
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #D4D3D9',
    '& button': {
      height: 42
    }
  },
  headerTutorialWelcomeText: {
    fontWeight: 600,
    fontSize: 24,
    color: '#26213F',
  },
  headerTutorialWelcomeSubText: {
    fontWeight: 'normal',    
    fontSize: 16,
    lineHeight: '24px',
    color: '#514D65',   
  },
  close: {
    position: 'absolute',
    right: 15,
    top: 15,
    cursor: 'pointer',
    '& img': {
      filter: 'brightness(0) invert(1)'
    }
  }
})

export default useStyles