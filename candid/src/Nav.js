import React, { Component } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PhoneIcon from "@material-ui/icons/Phone";
import axios from "axios";
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
      ph: null,
      time: null,
      day: null,
      buttons: [],
    };
  }
  componentDidMount() {
    let a = document.getElementById("di");
    a.addEventListener("click", this.out);
    window.addEventListener("scroll", this.handleScroll);
    axios
      .post(`/nav`)
      .then((res) => {
        if (res.data.e) {
          this.setState({
            ph: res.data.e.ph,
            time: res.data.e.time,
            day: res.data.e.day,
            buttons: res.data.e.buttons,
          });
        }
        if (res.data.a) {
          this.setState({
            ph: res.data.a.ph,
            time: res.data.a.time,
            day: res.data.a.day,
            buttons: res.data.a.buttons,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillUnmount() {
    let a = document.getElementById("di");
    a.removeEventListener("click", this.out);
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    if (window.scrollY >= 90) {
      document.querySelector(".menu").style.position = "fixed";
      document.querySelector(".menu").style.top = "0";
      document.querySelector("#di").style.position = "relative";
      document.querySelector("#di").style.paddingTop = "70px";
    } else {
      document.querySelector(".menu").style.position = "relative";
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
    return (
      <React.Fragment>
        <div className="barDraw" onClick={this.bars}>
          <div style={this.state.bar1}></div>
          <div style={this.state.bar2}></div>
          <div style={this.state.bar3}></div>
        </div>
        <div className="menuDraw" style={this.state.dis}>
          <div>
            <hr></hr>
            <Link to="/">
              <HomeIcon id="homI" />
            </Link>
            <Link to="/blog">
              <button>{ReactHtmlParser (this.state.buttons[0])}</button> 
            </Link>
            <Link to="/gallery">
              <button>{ReactHtmlParser (this.state.buttons[1])}</button>
            </Link>
            <Link to="/contact">
              <button>{ReactHtmlParser (this.state.buttons[2])}</button>
            </Link>
            <Link to="/about">
              <button>{ReactHtmlParser (this.state.buttons[3])}</button>
            </Link>
            <hr></hr>
          </div>
          <div>
            <PhoneIcon className="phI" />
            <br></br>
            <a href={"tel:" + this.state.ph}> 
              {this.state.ph}
            </a>
            <br></br>
            <br></br>
            <AccessTimeIcon className="phI" />
            <br></br>
            <span>
              {ReactHtmlParser (this.state.time)}
              <br></br>
              {ReactHtmlParser (this.state.day)}
            </span>
          </div>
          <img src="https://candid.s3-ap-southeast-2.amazonaws.com/logos.jpg" alt="Smiley face" width="60" height="60"></img>
        </div>
        <header>
          <img src="https://candid.s3-ap-southeast-2.amazonaws.com/logo.jpg" alt="Smiley face" width="140" height="32"></img>
        </header>
        <div className="menu">
          <div className="mMove">
            <Link to="/blog">
              <button>{ReactHtmlParser (this.state.buttons[0])}</button> 
            </Link>
            <Link to="/gallery">
              <button>{ReactHtmlParser (this.state.buttons[1])}</button>
            </Link>
            <Link to="/contact">
              <button>{ReactHtmlParser (this.state.buttons[2])}</button>
            </Link>
            <Link to="/about">
              <button>{ReactHtmlParser (this.state.buttons[3])}</button>
            </Link>
            <div className="mMove0">
              <PhoneIcon className="apI" />
              <a href={"tel:" + this.state.ph}> 
              {this.state.ph}
              </a>
              <AccessTimeIcon className="apI" />
              <span>
              {ReactHtmlParser (this.state.time)} / {ReactHtmlParser (this.state.day)}
              </span>
              <Link to="/">
                <HomeIcon id="homIa" className="apI" />
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Nav;
