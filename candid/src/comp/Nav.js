import React, { Component } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import parse from "html-react-parser";

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
      dis: false,
    };
  }
  componentDidMount() {
    document.querySelector(".burgerMenu").addEventListener("click", this.menu);
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }
  componentWillUnmount() {
    document
      .querySelector(".burgerMenu")
      .removeEventListener("click", this.menu);
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    if (window.scrollY >= 90) {
      this.setState({ class: "navFixed" });
      this.props.main("navFixed");
    } else {
      this.setState({ class: "navRelative" });
      this.props.main("navRelative");
    }
  };
  menu = () => {
    this.setState({
      dis: true,
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
    document.body.addEventListener("click", this.menuClose);
  };
  menuClose = () => {
    if (event.target.className !== "burgerMenu") {
      this.setState({
        dis: false,
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
      });
      document.body.removeEventListener("click", this.menuClose);
    }
  };
  render() {
    let { phone, hours, days, buttons } = this.props;
    return (
      <React.Fragment>
        <div className="burgerMenu"></div>
        <div className={`burgerMenuTrue ${this.state.dis}`}></div>
        <div className="burgerMenuContainer">
          <div className="bar" style={this.state.bar1}></div>
          <div className="bar" style={this.state.bar2}></div>
          <div className="bar" style={this.state.bar3}></div>
        </div>
        <nav className={`mobileNav ${this.state.dis}`}>
          <ul>
            <hr></hr>
            <li>
              <Link to="/">
                <HomeIcon aria-labelledby="hl1" role="link">
                  Home
                </HomeIcon>
                <span id="hl1" className="hiddenText">
                  Homepage Link
                </span>
              </Link>
            </li>
            <li>
              <Link to="/blog">{parse(buttons[0])}</Link>
            </li>
            <li>
              <Link to="/gallery">{parse(buttons[1])}</Link>
            </li>
            <li>
              <Link to="/about">{parse(buttons[3])}</Link>
            </li>
            <li>
              <Link to="/contact">{parse(buttons[2])}</Link>
            </li>
            <hr></hr>
          </ul>
          <ul>
            <li>
              <AccessTimeIcon />
            </li>
            <li>
              <span>
                {parse(hours)}
                <br></br>
                {parse(days)}
              </span>
            </li>
            <li>
              <PhoneIcon />
            </li>
            <li>
              <a href={"tel:" + phone}>{phone}</a>
            </li>
            <li>
              <Link to="/">
                <img
                  src="https://candid.s3-ap-southeast-2.amazonaws.com/logos.png"
                  alt="Candid Icon"
                  width="60"
                  height="60"
                ></img>
              </Link>
            </li>
          </ul>
        </nav>
        <header>
          <Link to="/">
            <img
              src="https://candid.s3.ap-southeast-2.amazonaws.com/logolarge.png"
              alt="Candid Logo"
              width="200"
              height="46"
            ></img>
          </Link>
        </header>
        <nav className={`mainNav ${this.state.class}`}>
          <ul>
            <li>
              <Link to="/blog">{parse(buttons[0])}</Link>
            </li>
            <li>
              <Link to="/gallery">{parse(buttons[1])}</Link>
            </li>
            <li>
              <Link to="/about">{parse(buttons[3])}</Link>
            </li>
            <li>
              <Link to="/contact">{parse(buttons[2])}</Link>
            </li>
          </ul>
          <ul>
            <li>
              <PhoneIcon />
              <a href={"tel:" + phone}>{phone}</a>
            </li>
            <li>
              <AccessTimeIcon />
              <span>
                {parse(hours)} / {parse(days)}
              </span>
            </li>
            <li>
              <Link to="/">
                <HomeIcon aria-labelledby="hl2" role="link">
                  Home
                </HomeIcon>
                <span id="hl2" className="hiddenText">
                  Homepage Link
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Nav;
