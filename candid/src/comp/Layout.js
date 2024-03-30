import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

const Layout = (props) => {
  const [main, setMain] = useState('navRelative')
  const {
    phone,
    hours,
    days,
    navigation,
    footer,
    logoFooter,
    logoMobile,
    logoDesktop
  } = props
  return (
    <>
      <Nav
        phone={phone}
        hours={hours}
        days={days}
        navigation={navigation}
        logoMobile={logoMobile}
        logoDesktop={logoDesktop}
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
        logoFooter={logoFooter}
      />
    </>
  )
}

export default Layout
