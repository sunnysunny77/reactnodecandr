import React, { Component } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PhoneIcon from "@material-ui/icons/Phone";
import ReactHtmlParser from 'react-html-parser';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bar1: {
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
        transition: "0.4s",
      },
      bar2: {
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
        transition: "0.4s",
      },
      bar3: {
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
        transition: "0.4s",
      },
      wi: "",
      hi: "",
      dis: ""
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    if (window.screen.width > 1200) {
      this.setState({
        wi: "200",
        hi: "46",
      });
    } else if (window.screen.width <= 1200) {
      this.setState({
        wi: "140",
        hi: "32",
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    if (window.scrollY >= 90) {
      document.querySelector(".mainNav").style.position = "fixed";
      document.querySelector(".mainNav").style.top = "0";
      document.querySelector(".mainNav").style.height = "40px";
      document.querySelector("main").style.position = "relative";
      document.querySelector("#di").style.paddingTop = "40px";
    } else {
      document.querySelector(".mainNav").style.position = "relative";
      document.querySelector(".mainNav").style.height = "60px";
      document.querySelector("main").style.paddingTop = "0";
    }
  };
  bars = () => {
    if (this.state.dis !== "slide") return this.setState({
      dis: "slide",
      bar1: {
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
        transition: "0.4s",
        WebkitTransform: "rotate(-45deg) translate(-9px, 6px)",
        transform: "rotate(-45deg) translate(-9px, 6px)",
      },
      bar2: {
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
        transition: "0.4s",
        opacity: "0",
      },
      bar3: {
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
        transition: "0.4s",
        WebkitTransform: "rotate(45deg) translate(-8px, -8px)",
        transform: "rotate(45deg) translate(-8px, -8px)",
      },
    });
    this.setState({
      dis: "out",
      bar1: {
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
        transition: "0.4s",
      },
      bar2: {
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
        transition: "0.4s",
      },
      bar3: {
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
        transition: "0.4s",
      },
    })
  };
  render() {
    let { ph, time, day, buttons } = this.props
    return (
      <React.Fragment>
        <div className="burgerMenu" onClick={this.bars}>
          <div style={this.state.bar1}></div>
          <div style={this.state.bar2}></div>
          <div style={this.state.bar3}></div>
        </div>
        <nav className={`mobileNav ${this.state.dis}`} >
          <ul>
            <hr></hr>
            <li>
              <Link to="/">
                <HomeIcon aria-labelledby="hl1" role="link" >Home</HomeIcon>
                <span id="hl1" className="hiddentext">Homepage Link</span>
              </Link>
            </li>
            <li>
              <Link to="/blog">
                {ReactHtmlParser(buttons[0])}
              </Link>
            </li>
            <li>
              <Link to="/gallery">
                {ReactHtmlParser(buttons[1])}
              </Link>
            </li>
            <li>
              <Link to="/contact">
                {ReactHtmlParser(buttons[2])}
              </Link>
            </li>
            <li>
              <Link to="/about">
                {ReactHtmlParser(buttons[3])}
              </Link>
            </li>
            <hr></hr>
          </ul>
          <ul>
            <li>
              <AccessTimeIcon />
            </li>
            <li>
              <span>
                {ReactHtmlParser(time)}
                <br></br>
                {ReactHtmlParser(day)}
              </span>
            </li>
            <li>
              <PhoneIcon />
            </li>
            <li>
              <a href={"tel:" + ph}>
                {ph}
              </a>
            </li>
            <li>
              <img src="https://candid.s3-ap-southeast-2.amazonaws.com/logos.png" alt="Candid Icon" width="60" height="60"></img>
            </li>
          </ul>
        </nav>
        <header>
          <img src="https://candid.s3.ap-southeast-2.amazonaws.com/logolarge.png" alt="Candid Logo" width={this.state.wi} height={this.state.hi}></img>
        </header>
        <nav className="mainNav">
          <ul>
            <li>
              <Link to="/blog">
                {ReactHtmlParser(buttons[0])}
              </Link>
            </li>
            <li>
              <Link to="/gallery">
                {ReactHtmlParser(buttons[1])}
              </Link>
            </li>
            <li>
              <Link to="/contact">
                {ReactHtmlParser(buttons[2])}
              </Link>
            </li>
            <li>
              <Link to="/about">
                {ReactHtmlParser(buttons[3])}
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <PhoneIcon />
              <a href={"tel:" + ph}>
                {ph}
              </a>
            </li>
            <li>
              <AccessTimeIcon />
              <span>
                {ReactHtmlParser(time)} / {ReactHtmlParser(day)}
              </span>
            </li>
            <li>
              <Link to="/">
                <HomeIcon aria-labelledby="hl2" role="link" >Home</HomeIcon>
                <span id="hl2" className="hiddentext">Homepage Link</span>
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Nav;