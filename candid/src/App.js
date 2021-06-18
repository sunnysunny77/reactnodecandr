import React, { useState, useEffect } from "react";
import "./App.scss";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
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
  const [load, setLoad] = useState(null);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    axios
      .post(`http://localhost:3005/nav`)
      .then((res) => {
        setPh(res.data.ph);
        setTime(res.data.time);
        setDay(res.data.day);
        setButtons(res.data.buttons);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <Router>
      <Nav ph={ph} time={time} day={day} buttons={buttons} />
      <main id="di">
        <Switch>
          <Route exact path="/">
              <link rel="preload" href="https://candid.s3-ap-southeast-2.amazonaws.com/wel1.jpg" as="image"></link>
              <link rel="preload" href="https://candid.s3-ap-southeast-2.amazonaws.com/wel2.jpg" as="image"></link>
              <link rel="preload" href="https://candid.s3-ap-southeast-2.amazonaws.com/wel1m.jpg" as="image"></link>
              <link rel="preload" href="https://candid.s3-ap-southeast-2.amazonaws.com/wel2m.jpg" as="image"></link>
            <Home setLoad={(x) => setLoad(x)} />
          </Route>
          <Route path="/blog" exact>
            <Blog setLoad={(x) => setLoad(x)} />
          </Route>
          <Route path="/gallery" exact>
            <Gallery setLoad={(x) => setLoad(x)} />
          </Route>
          <Route path="/contact" exact>
            <Contact setLoad={(x) => setLoad(x)} />
          </Route>
          <Route path="/about" exact>
            <About setLoad={(x) => setLoad(x)} />
          </Route>
        </Switch>
      </main>
      <Footer ph={ph} time={time} day={day} buttons={buttons} load={load} />
    </Router>
  );
}

export default App;
