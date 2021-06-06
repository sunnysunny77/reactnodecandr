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
import { SettingsApplicationsOutlined } from "@material-ui/icons";

function App() {
  const [ph, setPh] = useState(null);
  const [time, setTime] = useState(null);
  const [day, setDay] = useState(null);
  const [load, setLoad] = useState("none");
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    axios
      .post(`https://candidcleaning.sunnyhome.site/nav`)
      .then((res) => {
        if (res.data.e) {
          setPh(res.data.e.ph);
          setTime(res.data.e.time);
          setDay(res.data.e.day);
          setButtons(res.data.e.buttons);
        }
        if (res.data.a) {
          setPh(res.data.a.ph);
          setTime(res.data.a.time);
          setDay(res.data.a.day);
          setButtons(res.data.a.buttons);
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
          <Route exact path="/">
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
          <Route  path="/about" exact>
            <About setLoad={(x) => setLoad(x)} />
          </Route>
        </Switch>
      </main>
      <Footer ph={ph} time={time} day={day} buttons={buttons} load={load} />
    </Router>
  );
}

export default App;
