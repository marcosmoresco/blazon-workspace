import React, { FC, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Image from 'next/image'
import Tutorial from '@components/Tutorial'
import type { SearchProps } from './types'
import useStyles from './styles'


const Search: FC<SearchProps> = ({classes}) => {

  return (
    <div className="Default-content">
      <Tutorial title="search.tutorial.title" text="search.tutorial.text" />   
      <div style={{marginTop: 20, marginBottom: 20}}>
        10 Itens
        <Divider />
      </div>   
    </div>
  )  
}

export default withStyles(useStyles)(Search)