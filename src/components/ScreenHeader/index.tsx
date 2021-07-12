import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { injectIntl, IntlShape } from 'react-intl'
import { Badge, Grid, makeStyles, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  root: {
    padding: '32px 64px 36px 64px',
    borderBottom: '1px solid #D1D2D4',
    width: '100%'
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'right',
    margin: 'auto'
  },
  arrow: {
    cursor: 'pointer'
  },
  back: {
    marginRight: 20
  },
  breadcrumb: {
    padding: 12,
    backgroundColor: '#E9E8EB',
    borderRadius: 6,
    fontSize: 16,
    display: 'inline-block'
  },
  breadcrumbIcon: {
    fontSize: 50,
    marginRight: 10
  }
}))

type ScreenHeaderProps = {
  intl: IntlShape
  target: string
  backPath?: string
  icon: React.ReactElement
}

const ScreenHeader: FC<ScreenHeaderProps> = ({ intl, target, icon, backPath }) => {
  const router = useRouter()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          { backPath && <Badge className={classes.back}>
            <ArrowBack onClick={() => router.push(backPath)}  />
          </Badge> }
          <div className={classes.breadcrumb}>
            <Badge>{icon}</Badge>
            <Badge style={{ marginLeft: 10 }}>
              <Typography>
                {intl.formatMessage({ id: `${target}.header.breadcrumb` })}
              </Typography>
            </Badge>
          </div>
        </Grid>
        { backPath && <Grid item xs={6} className={classes.title}>
          {intl.formatMessage({ id: `${target}.header.title` })}
        </Grid> }
      </Grid>
    </div>
  )
}

export default injectIntl(ScreenHeader)
