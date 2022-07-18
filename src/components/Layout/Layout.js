import React, { Children } from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
    <Header/>
    <main style={{minheight:"82vh"}}>
        {children}
        </main>
        <Footer/>
    </>
   
  )
}

export default Layout