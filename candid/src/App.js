import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
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
  const [imagesPreLoad, setImagesPreLoad] = useState(
    {
        "/": [
            "https://candid.s3-ap-southeast-2.amazonaws.com/card1.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/card2.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/card3.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/card4.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/card5.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/card6.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/v1.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/v2.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/v3.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/v4.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/v5.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/v6.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/wel1.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/wel1m.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/wel2.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/wel2m.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/welcome.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/info.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/info1.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
        ],
        "/about": [
            "https://candid.s3-ap-southeast-2.amazonaws.com/about.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/breakp.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/svg.svg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/svg0.svg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
        ],
        "/gallery": [
            "https://candid.s3-ap-southeast-2.amazonaws.com/c1.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/c2.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/c3.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/c4.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/svg0.svg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
        ],
        "/contact": [
            "https://candid.s3-ap-southeast-2.amazonaws.com/cont.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/svg.svg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/svg0.svg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
        ],
        "/blog": [
            "https://candid.s3-ap-southeast-2.amazonaws.com/ikon.jpg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/svg0.svg",
            "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
            "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
        ],
    }
  );
  useEffect(() => {
    for (let source of imagesPreLoad[window.location.pathname]) {
        const img = new Image();
        img.src = source;
        console.log(source)
    }
  }, [imagesPreLoad[window.location.pathname]]);
  useEffect(() => {
    axios
    .post('/api-init')
    .then((res) => {
      setPhone(res.data.phone);
      setHours(res.data.hours);
      setDays(res.data.days);
      setButtons(res.data.buttons);
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
        <Route path="/" element={<Layout phone={phone} hours={hours} days={days} buttons={buttons} footer={footer}/>} >
          <Route index element={<Home footer={(param) => setFooter(param)}/>} />
          <Route path="/blog" element={<Blog table={table} setTable={(param) => setTable(param)} footer={(param) =>  setFooter(param)}/>} />
          <Route path="/gallery" element={<Gallery footer={(param) => setFooter(param)}/>} />
          <Route path="/contact" element={<Contact footer={(param) => setFooter(param)}/>} />
          <Route path="/about" element={<About footer={(param) => setFooter(param)}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
