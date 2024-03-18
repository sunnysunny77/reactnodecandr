import React, { Component } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import parse from 'html-react-parser';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "navRelative",
      bar1: {
        width: "25px",
        height: "3px",
        backgroundColor: "black",
        margin: "6px auto",
        transition: "0.4s",
      },
      bar2: {
        width: "25px",
        height: "3px",
        backgroundColor: "black",
        margin: "6px auto",
        transition: "0.4s",
      },
      bar3: {
        width: "25px",
        height: "3px",
        backgroundColor: "black",
        margin: "6px auto",
        transition: "0.4s",
      },
      wi: "",
      hi: "",
      dis: false
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    if (window.screen.width > 1200) return this.setState({
      wi: "200",
      hi: "46",
    });
    this.setState({
      wi: "140",
      hi: "32",
    });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    if (window.scrollY >= 90) {
      this.setState({ class: "navFixed"});
      this.props.main("navFixed")
    } else {
      this.setState({ class: "navRelative"});
      this.props.main("navRelative")
    }
  };
  bars = () => {
    this.setState({
      dis: "slide",
      bar1: {
        width: "25px",
        height: "3px",
        backgroundColor: "black",
        margin: "6px auto",
        transition: "0.4s",
        WebkitTransform: "rotate(-45deg) translate(-6px, 4px)",
        transform: "rotate(-45deg) translate(-6px, 4px)",
      },
      bar2: {
        width: "25px",
        height: "3px",
        backgroundColor: "black",
        margin: "6px auto",
        transition: "0.4s",
        opacity: "0",
      },
      bar3: {
        width: "25px",
        height: "3px",
        backgroundColor: "black",
        margin: "6px auto",
        transition: "0.4s",
        WebkitTransform: "rotate(45deg) translate(-8px, -8px)",
        transform: "rotate(45deg) translate(-8px, -8px)",
      },
    });
  };
  barsOut = () => {
    this.setState({
      dis: "out",
      bar1: {
        width: "25px",
        height: "3px",
        backgroundColor: "black",
        margin: "6px auto",
        transition: "0.4s",
      },
      bar2: {
        width: "25px",
        height: "3px",
        backgroundColor: "black",
        margin: "6px auto",
        transition: "0.4s",
      },
      bar3: {
        width: "25px",
        height: "3px",
        backgroundColor: "black",
        margin: "6px auto",
        transition: "0.4s",
      },
    })
  }
  render() {
    let { ph, time, day, buttons } = this.props
    return (
      <React.Fragment>
        <div className="burgerContainer">
          <div className="burgerMenu" onClick={this.bars}>
            <div style={this.state.bar1}></div>
            <div style={this.state.bar2}></div>
            <div style={this.state.bar3}></div>
          </div>
          <div className={`barsOut ${this.state.dis}`} onClick={this.barsOut}> </div>
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
                {parse(buttons[0])}
              </Link>
            </li>
            <li>
              <Link to="/gallery">
                {parse(buttons[1])}
              </Link>
            </li>
            <li>
              <Link to="/contact">
                {parse(buttons[2])}
              </Link>
            </li>
            <li>
              <Link to="/about">
                {parse(buttons[3])}
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
                {parse(time)}
                <br></br>
                {parse(day)}
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
              <Link to="/">
                <img src="https://candid.s3-ap-southeast-2.amazonaws.com/logos.png" alt="Candid Icon" width="60" height="60"></img>
              </Link>
            </li>
          </ul>
        </nav>
        <header>
          <Link to="/">
            <img src="https://candid.s3.ap-southeast-2.amazonaws.com/logolarge.png" alt="Candid Logo" width={this.state.wi} height={this.state.hi}></img>
          </Link>
        </header>
        <nav className={`mainNav ${this.state.class}`}>
          <ul>
            <li>
              <Link to="/blog">
                {parse(buttons[0])}
              </Link>
            </li>
            <li>
              <Link to="/gallery">
                {parse(buttons[1])}
              </Link>
            </li>
            <li>
              <Link to="/contact">
                {parse(buttons[2])}
              </Link>
            </li>
            <li>
              <Link to="/about">
                {parse(buttons[3])}
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
                {parse(time)} / {parse(day)}
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
