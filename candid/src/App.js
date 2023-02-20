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
  const [load, setLoad] = useState(false);
  const [buttons, setButtons] = useState([]);

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
    <Router>
      {load ? (<React.Fragment>
        <Nav ph={ph} time={time} day={day} buttons={buttons} />
        <main id="di">
          <Switch>
            <Route exact path="/">
              {window.screen.width > 1200 ? (
                <React.Fragment>
                  <link
                    rel="preload"
                    href="https://candid.s3-ap-southeast-2.amazonaws.com/wel1.jpg"
                    as="image"
                  ></link>
                  <link
                    rel="preload"
                    href="https://candid.s3-ap-southeast-2.amazonaws.com/wel2.jpg"
                    as="image"
                  ></link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <link
                    rel="preload"
                    href="https://candid.s3-ap-southeast-2.amazonaws.com/wel1m.jpg"
                    as="image"
                  ></link>
                  <link
                    rel="preload"
                    href="https://candid.s3-ap-southeast-2.amazonaws.com/wel2m.jpg"
                    as="image"
                  ></link>
                </React.Fragment>
              )}
              <Home />
            </Route>
            <Route path="/blog" exact>
              <Blog />
            </Route>
            <Route path="/gallery" exact>
              <Gallery />
            </Route>
            <Route path="/contact" exact>
              <Contact />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
          </Switch>
        </main>
        <Footer ph={ph} time={time} day={day} buttons={buttons} />
      </React.Fragment>) : (
        <img
          className="loadfront"
          src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
          alt="loading"
        />
      )}
    </Router>
  );
}

export default App;
