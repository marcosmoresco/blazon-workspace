import React, { Component } from 'react'
import Header from './portal/Header'
import Footer from './portal/Footer'

class Layout extends Component {
  render () {
    const { children } = this.props
    return (
      <div className='App'>
        <Header />
        {children}   
        <Footer />     
      </div>
    )
  }
}

export default Layout