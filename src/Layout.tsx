import React, { Component } from 'react'
import Header from './portal/Header'

class Layout extends Component {
  render () {
    const { children } = this.props
    return (
      <div className='App'>
        <Header />
        {children}        
      </div>
    )
  }
}

export default Layout