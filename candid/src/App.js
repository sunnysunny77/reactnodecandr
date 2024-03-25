import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./comp/Layout";
import Home from "./comp/Home";
import Blog from "./comp/Blog";
import Gallery from "./comp/Gallery";
import Contact from "./comp/Contact";
import About from "./comp/About";
import axios from "axios";

function App() {
  const [table, setTable] = useState(null);
  const [phone, setPhone] = useState(null);
  const [hours, setHours] = useState(null);
  const [days, setDays] = useState(null);
  const [load, setLoad] = useState(true);
  const [footer, setFooter] = useState("loading");
  const [buttons, setButtons] = useState([]);
  const [imagesPreLoad, setImagesPreLoad] = useState({
    "/": [
    ],
    "/about": [
    ],
    "/gallery": [
    ],
    "/contact": [
    ],
    "/blog": [
    ],
  });
  useEffect(() => {
    const path = window.location.pathname;
    for (let source of imagesPreLoad[path]) {
      const img = new Image();
      img.src = source;
      imagesPreLoad[path] = [];
      setImagesPreLoad({ ...imagesPreLoad });
      console.log(source);
    }

  }, [imagesPreLoad[window.location.pathname]]);
  useEffect(() => {
    axios
      .post("/api-init")
      .then((res) => {
        setPhone(res.data.phone);
        setHours(res.data.hours);
        setDays(res.data.days);
        setButtons(res.data.buttons);
        setImagesPreLoad(res.data.images);
        setLoad(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  if (load) {
    return (
      <React.Fragment>
        <img
          id="loadFront"
          src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
          alt="loading"
        />
      </React.Fragment>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              phone={phone}
              hours={hours}
              days={days}
              buttons={buttons}
              footer={footer}
            />
          }
        >
          <Route
            index
            element={<Home footer={(param) => setFooter(param)} />}
          />
          <Route
            path="/blog"
            element={
              <Blog
                table={table}
                setTable={(param) => setTable(param)}
                footer={(param) => setFooter(param)}
              />
            }
          />
          <Route
            path="/gallery"
            element={<Gallery footer={(param) => setFooter(param)} />}
          />
          <Route
            path="/about"
            element={<About footer={(param) => setFooter(param)} />}
          />
          <Route
            path="/contact"
            element={<Contact footer={(param) => setFooter(param)} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
