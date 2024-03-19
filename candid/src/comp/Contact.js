import React, { Component } from "react";
import "./Contact.scss";
import Wave from "./Wave";
import ContactsIcon from "@mui/icons-material/Contacts";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import parse from 'html-react-parser';

export default class Contactc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      res: {},
      load: true,
    };
    this.props.footer("loading");
  }
  componentDidMount() {
    axios.post(`/cont`).then((res) => {
      this.setState({ res: res.data, load: false });
      this.props.footer("load");
    })
      .catch((error) => {
        alert(error);
      });
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.handleScroll, { passive: true });
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
              <h1>{parse(this.state.res.buttons[0])}</h1>
            </div>
            <section className="contactContOne">
              <div className="contactOne"></div>
              <div className="contactTwo">
                <h2>
                  {parse(this.state.res.h)}{" "}
                  <ContactsIcon />
                </h2>
                <hr />
                <p>
                  {parse(this.state.res.et)}
                  <br></br>
                  &nbsp;&nbsp;
                  <a href={"mailto:" + this.state.res.email}>
                    {this.state.res.email}
                  </a>
                  <br></br>
                  {parse(this.state.res.pt)}
                  <br></br>
                  &nbsp;&nbsp;
                  <a href={"tel:" + this.state.res.ph}>{this.state.res.ph}</a>
                  <br></br>
                  {parse(this.state.res.it)}
                  <br></br>
                  &nbsp; <span> {parse(this.state.res.it2)}</span>
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
                {parse(this.state.res.h2)}{" "}
                <ContactsIcon />{" "}
              </h2>
              <hr />
              <Wave>
                <div id="contactResponse" className="prop">
                  {parse(this.state.res.avail)}
                </div>
              </Wave>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
