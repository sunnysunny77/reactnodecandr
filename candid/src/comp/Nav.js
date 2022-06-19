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
      s: false,
      dis: { display: "none" },
      wi: "",
      hi: ""
    };
  }
  componentDidMount() {
    let a = document.getElementById("di");
    a.addEventListener("click", this.out);
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
    let a = document.getElementById("di");
    a.removeEventListener("click", this.out);
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    if (window.scrollY >= 90) {
      document.querySelector(".mainNav").style.position = "fixed";
      document.querySelector(".mainNav").style.top = "0";
      document.querySelector("#di").style.position = "relative";
      document.querySelector("#di").style.paddingTop = "60px";
    } else {
      document.querySelector(".mainNav").style.position = "relative";
      document.querySelector("#di").style.paddingTop = "0";
    }
  };
  out = () => {
    if (this.state.s === true) {
      this.setState({
        s: false,
        dis: { display: "none" },
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
      });
    }
  };
  bars = () => {
    this.state.s
      ? this.setState({
        s: false,
        dis: { display: "none" },
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
      : this.setState({
        s: true,
        dis: { display: "block" },
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
        <nav className="mobileNav" style={this.state.dis}>
          <div>
            <hr></hr>
            <Link to="/">
              <HomeIcon aria-labelledby="hl1" role="link" >Home</HomeIcon>
              <span id="hl1" className="hiddentext">Homepage Link</span>
            </Link>
            <Link to="/blog">
              {ReactHtmlParser(buttons[0])}
            </Link>
            <Link to="/gallery">
              {ReactHtmlParser(buttons[1])}
            </Link>
            <Link to="/contact">
              {ReactHtmlParser(buttons[2])}
            </Link>
            <Link to="/about">
              {ReactHtmlParser(buttons[3])}
            </Link>
            <hr></hr>
          </div>
          <div>
            <AccessTimeIcon />
            <br></br>
            <span>
              {ReactHtmlParser(time)}
              <br></br>
              {ReactHtmlParser(day)}
            </span>
            <br></br>
            <PhoneIcon />
            <br></br>
            <a href={"tel:" + ph}>
              {ph}
            </a>
          </div>
          <img src="https://candid.s3-ap-southeast-2.amazonaws.com/logos.png" alt="Candid Icon" width="60" height="60"></img>
        </nav>
        <header>
          <img src="https://candid.s3.ap-southeast-2.amazonaws.com/logolarge.png" alt="Candid Logo" width={this.state.wi} height={this.state.hi}></img>
        </header>
        <nav className="mainNav">
          <div>
            <Link to="/blog">
              {ReactHtmlParser(buttons[0])}
            </Link>
            <Link to="/gallery">
              {ReactHtmlParser(buttons[1])}
            </Link>
            <Link to="/contact">
              {ReactHtmlParser(buttons[2])}
            </Link>
            <Link to="/about">
              {ReactHtmlParser(buttons[3])}
            </Link>
          </div>
          <div>
            <PhoneIcon />
            <a href={"tel:" + ph}>
              {ph}
            </a>
            <AccessTimeIcon />
            <span>
              {ReactHtmlParser(time)} / {ReactHtmlParser(day)}
            </span>
            <Link to="/">
              <HomeIcon aria-labelledby="hl2" role="link" >Home</HomeIcon>
              <span id="hl2" className="hiddentext">Homepage Link</span>
            </Link>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Nav;