import React, { useState, useEffect } from "react";
import "./App.scss";
import Nav from "./Nav";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./comp/Home";
import Blog from "./comp/Blog";
import Gallery from "./comp/Gallery";
import Contact from "./comp/Contact";
import About from "./comp/About";
import Footer from "./Footer";
import axios from "axios";



function App() {
  const [ph, setPh] = useState(null);
  const [time, setTime] = useState(null);
  const [day, setDay] = useState(null);
  const [buttons, setButtons] = useState([]);
  useEffect(() => {
    axios
      .post(`https://candidcleaning.sunnyhome.site/nav`)
      .then((res) => {
        if (res.data.e) {
          setPh(res.data.e.ph)
            setTime(res.data.e.time)
            setDay(res.data.e.day)
            setButtons(res.data.e.buttons)
      }
        if (res.data.a) {
          setPh(res.data.a.ph)
          setTime(res.data.a.time)
          setDay(res.data.a.day)
          setButtons(res.data.a.buttons)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Router>
      <Nav ph={ph} time={time} day={day} buttons={buttons} />
      <main id="di">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/blog" component={Blog} exact />
          <Route path="/gallery" component={Gallery} exact />
          <Route path="/contact"  component={Contact} exact />
          <Route path="/about"  component={About} exact />
        </Switch>
      </main>
      <Footer ph={ph} time={time} day={day} buttons={buttons}/>
    </Router>
  );
}

export default App;
