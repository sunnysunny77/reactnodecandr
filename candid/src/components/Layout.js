import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Layout = (props) => {
  const [main, setMain] = useState('navRelative')
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
        main={(param) => setMain(param)}
      />
      <main className={main}>
        <Outlet />
      </main>
      <Footer
        footer={footer}
        phone={phone}
        hours={hours}
        days={days}
        navigation={navigation}
        logo={logo}
      />
    </>
  )
}

export default Layout
