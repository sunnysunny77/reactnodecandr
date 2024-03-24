import React , { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = (props) => {
    const [main, setMain] = useState("navRelative");
    let { phone, hours, days, buttons, footer } = props;
    return (
        <>
        <Nav phone={phone} hours={hours} days={days} buttons={buttons} main={(param) => setMain(param)} />
        <main className={main} >
            <Outlet />
        </main>
        <Footer footer={footer} phone={phone} hours={hours} days={days} buttons={buttons} />
        </>
    )
};

export default Layout;
