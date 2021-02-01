import "./App.css";
import Nav from "./Nav";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./comp/Home";
import Blog from "./comp/Blog";
import Gallery  from "./comp/Gallery";
import Contact from "./comp/Contact";
import About  from "./comp/About";

function App() {
  return (
    <Router>
      <Nav />
      <main id="di">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/blog" component={Blog} exact />
        <Route path="/gallery" component={Gallery} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/about" component={About} exact />
      </Switch>
      </main>
      <footer>
        <img
          style={{ paddingBottom: "10px", paddingTop: "10px" }}
          src="./foot.jpg"
          alt="Smiley face"
          width="40"
          height="40"
        ></img>
      </footer>
    </Router>
  );
}

export default App;
