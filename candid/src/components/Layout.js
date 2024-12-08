import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Layout = (props) => {
  const {
    phone,
    hours,
    days,
    navigation,
    footer,
    logo
  } = props
  return (
    <>
      <Nav
        phone={phone}
        hours={hours}
        days={days}
        navigation={navigation}
        logo={logo}
      />
      <main>
        <Outlet />
      </main>
      <Footer
        footer={footer}
        logo={logo}
      />
    </>
  )
}

export default Layout
