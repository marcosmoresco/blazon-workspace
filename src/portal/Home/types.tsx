import { IntlShape } from 'react-intl'

export type HomeProps = { 
  intl: IntlShape
  classes: any  
}

export type HomeState = {   
  open?: boolean,
  passwordVault?: any 
}