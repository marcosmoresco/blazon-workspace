import KeyIcon from '@icons/Key'
import { Grid } from '@material-ui/core'
import React, { FC } from 'react'
import { useStyles } from './../../portal/Home/styles'
import { withStyles } from '@material-ui/core/styles'

type PasswordVaultItemProps = {
  classes: any
  setOpen(open: boolean): void
  setPasswordVault(item: any): void
  r: any
}

const PasswordVaultItem: FC<PasswordVaultItemProps> = ({
  classes,
  setOpen,
  setPasswordVault,
  r
}) => {
  return (
    <div
      className={classes?.valtItem || ''}
      onClick={() => {
        setOpen(true)
        setPasswordVault(r)
      }}
    >
      <div className={classes.recentPasswordCard}>
        <div className={classes.recentPasswordCardContent}>
          <div className={classes.recentPasswordCardContentHeader}>
            <div className={classes.recentPasswordCardContentHeaderImage}>
              <KeyIcon width={30} height={30} color='#3174F6' />
            </div>
            <div>
              <div className={classes.recentPasswordCardContentHeaderTitle}>
                {r.name}
              </div>
              <div className={classes.recentPasswordCardContentHeaderUsername}>
                {r.username}
              </div>
            </div>
          </div>
          <div className={classes.recentPasswordCardContentHeaderText}>
            {r.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withStyles(useStyles)(PasswordVaultItem)
