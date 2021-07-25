import React, { FC, useState } from 'react'
import { injectIntl, IntlShape } from 'react-intl'
import useStyles from './styles'
import { withStyles } from '@material-ui/styles'
import Upload from '@icons/Upload'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Grid } from '@material-ui/core'

// https://github.com/kirill3333/react-avatar/issues/72
const AvatarNoSSR = dynamic(() => import('react-avatar-edit'), { ssr: false })

type EditAvatarProps = {
  intl: IntlShape
  classes: any,
  onCrop(thumb: string): void 
}

const EditAvatar: FC<EditAvatarProps> = ({ classes, intl, onCrop }) => {
    
  const [image, setImage] = useState("")    

  return (
    <div className={classes.center}>
      <Grid container className={classes.avatarContainer}>
        <Grid item xs={image ? 6 : 12}>
          <div className={classes.avatarSelectorComponent}>
            <AvatarNoSSR
              height={200}
              width={200}
              label={<Upload height={64} width={64} color='#92909F' />}
              src={image}
              onClose={() => setImage(null)}
              onCrop={(preview) => {
                setImage(preview); 
                onCrop(preview);              
              }}
            />
          </div>
        </Grid>
        {image && (
          <Grid item xs={6}>
            <Image src={image} alt='Preview' height={200} width={200} />
          </Grid>
        )}
      </Grid>

      <div className={classes.uploadImageTitle}>
        {intl.formatMessage({ id: 'profile.edit.avatar.dialog.title' })}
      </div>
      <div className={classes.uploadImageDescription}>
        {intl.formatMessage({
          id: 'profile.edit.avatar.dialog.description'
        })}
      </div>
    </div>
  )
}

export default withStyles(useStyles)(injectIntl(EditAvatar))
