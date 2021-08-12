import React from 'react'
import Image from 'next/image'
import { withStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'
//import { GridOverlay } from '@material-ui/data-grid'
import empty from '../images/empty.svg'

const styles = () => ({  
  
  root: {
    flexDirection: 'column'    
  },
  emptyGridContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  emptyGridInfo: {
    display: 'flex',
    alignItems: 'center',
    margin: '50px 0'
  }, 
  emptyGridTemplateLabel: {
    marginLeft: 14,
    maxWidth: 323,
  },
  emptyGridLabel: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,    
    color: '#26213F',
    width: 192,    
    lineHeight: '18px',
  }
});

class CustomNoRowsOverlay extends React.Component {

  render() {
    const {
      props,
    } = this

    const { isEmpty, template, emptyStateImage, classes } = props 

    const id = (isEmpty && 'no.results') || 'end.of.results'

    return (
      <div className={classes.root}>
        <div className={classes.emptyGridContent}>
          <div className={classes.emptyGridInfo}>
            <Image alt="Empty" src={emptyStateImage || empty} />
            <div className={classes.emptyGridTemplateLabel}>
              <div className={classes.emptyGridLabel}>
                <FormattedMessage id={id} />
              </div>
              {template}
            </div>          
          </div>                  
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(CustomNoRowsOverlay)