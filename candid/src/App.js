import React, { useState, useEffect } from "react";
import "./App.scss";
import Nav from "./Nav";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import Home from "./comp/Home";
import Blog from "./comp/Blog";
import Gallery from "./comp/Gallery";
import Contact from "./comp/Contact";
import About from "./comp/About";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import HomeIcon from "@material-ui/icons/Home"; 

function App() {
  const [ph, setPh] = useState(null);
  const [time, setTime] = useState(null);
  const [day, setDay] = useState(null);
  const [buttons, setButtons] = useState([]);
  useEffect(() => {
    axios
      .post(`/nav`)
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
          <Route path={"/" + buttons[0]} component={Blog} exact />
          <Route path={"/" + buttons[1]} component={Gallery} exact />
          <Route path={"/" + buttons[2]} component={Contact} exact />
          <Route path={"/" + buttons[3]} component={About} exact />
        </Switch>
      </main>
      <footer>
        <ul id="ul">
          <li className="bl">
            <Link to="/">
              <HomeIcon />
            </Link>
          </li>
          <li className="bl">
            {ReactHtmlParser (time)} / {ReactHtmlParser (day)}
          </li>
          <li className="bl">
            <a href={"tel:" + ph}> 
              {ph}
            </a>
          </li>
          <li className="br">
            <Link to={"/" + buttons[0]}>
             {ReactHtmlParser (buttons[0])}
            </Link>
          </li>  
          <li className="br">
            <Link to={"/" + buttons[1]}>
              {ReactHtmlParser (buttons[1])}
            </Link>
          </li>  
          <li className="br">
            <Link to={"/" + buttons[2]}>
             {ReactHtmlParser (buttons[2])}
            </Link>
          </li>  
          <li>
            <Link to={"/" + buttons[3]}>
             {ReactHtmlParser (buttons[3])}
            </Link>
          </li>
        </ul>
        <img
          src="https://candid.s3-ap-southeast-2.amazonaws.com/foot.png"
          alt="Smiley face"
          width="40"
          height="40"
        />
      </footer>
    </Router>
  );
}

export default App;
