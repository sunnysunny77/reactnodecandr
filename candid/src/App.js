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
  const [ph, setPh] = useState(null);
  const [time, setTime] = useState(null);
  const [day, setDay] = useState(null);
  const [load, setLoad] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [main, setMain] = useState("navRelative");

  useEffect(() => {
    axios
      .post('/nav')
      .then((res) => {
        setPh(res.data.ph);
        setTime(res.data.time);
        setDay(res.data.day);
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
        <Nav ph={ph} time={time} day={day} buttons={buttons} main={(x) => setMain(x)} />
        <main className={main} id="di">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer ph={ph} time={time} day={day} buttons={buttons} />
      </React.Fragment>) : (
        <img
          id="loadfront"
          src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
          alt="loading"
        />
      )}
    </BrowserRouter>
  );
}

export default App;
