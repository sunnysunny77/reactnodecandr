import React, { Component } from "react";
import "./Contact.scss";
import Wave from "./Wave";
import ContactsIcon from "@material-ui/icons/Contacts";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

export default class Contactc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      res: {},
      load: true,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
    axios.post(`/cont`).then((res) => {
      this.setState({ res: res.data, load: false });
    })
      .catch((error) => {
        alert(error);
      });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
  }
  handleScroll = () => {
    if (window.innerWidth > 1200) return document.querySelector(".wave0").style.top = "40px";
    if (window.innerWidth <= 1200) document.querySelector(".wave0").style.top = "0px";
  };
  render() {
    return (
      <React.Fragment>
        {this.state.load ? (
          <img
            id="load"
            src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
            alt="loading"
          />
        ) : (
          <React.Fragment>
            {this.state.w}
            <div className="headingCont">
              <h1>{ReactHtmlParser(this.state.res.buttons[0])}</h1>
            </div>
            <section className="contactContOne">
              <div className="contactOne"></div>
              <div className="contactTwo">
                <h2>
                  {ReactHtmlParser(this.state.res.h)}{" "}
                  <ContactsIcon />
                </h2>
                <hr />
                <p>
                  {ReactHtmlParser(this.state.res.et)}
                  <br></br>
                  &nbsp;&nbsp;
                  <a href={"mailto:" + this.state.res.email}>
                    {this.state.res.email}
                  </a>
                  <br></br>
                  {ReactHtmlParser(this.state.res.pt)}
                  <br></br>
                  &nbsp;&nbsp;
                  <a href={"tel:" + this.state.res.ph}>{this.state.res.ph}</a>
                  <br></br>
                  {ReactHtmlParser(this.state.res.it)}
                  <br></br>
                  &nbsp; <span> {ReactHtmlParser(this.state.res.it2)}</span>
                  <HelpOutlineIcon
                    onClick={() => {
                      var x = window.location.origin;
                      window.location.replace(x + "?in=in");
                    }}
                  />
                  <br></br>
                </p>
              </div>
              <br className="clearfloat" />
            </section>
            <section className="contactContTwo">
              <h2>
                {ReactHtmlParser(this.state.res.h2)}{" "}
                <ContactsIcon />{" "}
              </h2>
              <hr />
              <Wave>
                <div id="contactResponse" className="prop">
                  {ReactHtmlParser(this.state.res.avail)}
                </div>
              </Wave>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
