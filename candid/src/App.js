import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from "./comp/Home";
import Blog from "./comp/Blog";
import Gallery from "./comp/Gallery";
import Contact from "./comp/Contact";
import About from "./comp/About";
import axios from "axios";
import Nav from "./comp/Nav";
import Footer from "./comp/Footer";

function App() {
  const [table, setTable] = useState(null);
  const [phone, setPhone] = useState(null);
  const [hours, setHours] = useState(null);
  const [days, setDays] = useState(null);
  const [load, setLoad] = useState(false);
  const [footer, setFooter] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [main, setMain] = useState("navRelative");
  useEffect(() => {
    axios
      .post('/api-init')
      .then((res) => {
        setPhone(res.data.phone);
        setHours(res.data.hours);
        setDays(res.data.days);
        setButtons(res.data.buttons);
        setLoad(true);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <BrowserRouter>
      {load ? (<React.Fragment>
        <Nav phone={phone} hours={hours} days={days} buttons={buttons} main={(param) => setMain(param)} />
        <main className={main} id="di">
          <Routes>
            <Route exact path="/" element={<Home  footer={(param) => setFooter(param)}/>} />
            <Route path="/blog" element={<Blog table={table} setTable={(param) => setTable(param)} footer={(param) =>  setFooter(param)}/>} />
            <Route path="/gallery" element={<Gallery footer={(param) => setFooter(param)}/>} />
            <Route path="/contact" element={<Contact footer={(param) => setFooter(param)}/>} />
            <Route path="/about" element={<About footer={(param) => setFooter(param)}/>} />
          </Routes>
        </main>
        <Footer footer={footer} phone={phone} hours={hours} days={days} buttons={buttons} />
      </React.Fragment>) : (
        <img
          id="loadFront"
          src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
          alt="loading"
        />
      )}
    </BrowserRouter>
  );
}

export default App;
