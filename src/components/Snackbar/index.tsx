import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'

const useStylesSnackbar = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    right: 'auto',
    bottom: 24,
    transform: 'translateX(-50%)', 
    zIndex: 3, 
    '& .Content': {
      height: 64,
      padding: '0 22px',
      background: '#232325',
      borderRadius: 38,
      display: 'flex',
      alignItems: 'center',
      '& .Message': {
        color: '#FCFCFC',
        fontSize: 15,
        marginRight: 10
      },
      '& .Actions': {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: -8,
        paddingLeft: 16,
      }
    }
  }
}))

export default function Snackbar(props:any) {

  const { open, total, action, align } = props   

  const classes = useStylesSnackbar()

  return (
    <div className={classes.root} style={!!align ? align : {}}>
      {open ? (
        <div className="Content">
          {total ? <span className="Message">{`${total} `}<FormattedMessage id={total === 1 ? "item.selected" : "items.selected"} /></span> : null} <div className="Actions">{action}</div>
        </div>       
      ) : null}      
    </div>
  )
}