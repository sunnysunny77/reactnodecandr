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
    axios
      .post(`http://localhost:3005/cont`)
      .then((res) => {
        this.setState({ res: res.data });
      })
      .then(() => {
        this.setState({ load: false });
        this.props.setLoad("block");
      })
      .catch((error) => {
        alert(error);
      });
    if (this.state.load) {
      this.props.setLoad("none");
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.load ? (
          <React.Fragment>
            <img
              className="load"
              src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
              alt="loading"
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.state.w}
            <div className="rh">
              <h1>{ReactHtmlParser(this.state.res.buttons[0])}</h1>
            </div>
            <section className="contlink">
              <div className="c1"></div>
              <div className="c2">
                <h2>
                  {ReactHtmlParser(this.state.res.h)}{" "}
                  <ContactsIcon className="infe" />
                </h2>
                <p>
                  &nbsp;&#8226;&nbsp;{ReactHtmlParser(this.state.res.et)}
                  <br></br>
                  &nbsp;&nbsp;
                  <a href={"mailto:" + this.state.res.email}>{this.state.res.email}</a>
                  <br></br>
                  <br></br>
                  &nbsp;&#8226;&nbsp;{ReactHtmlParser(this.state.res.pt)}
                  <br></br>
                  &nbsp;&nbsp;
                  <a href={"tel:" + this.state.res.ph}>{this.state.res.ph}</a>
                  <br></br>
                  <br></br>
                  &nbsp;&#8226;&nbsp;{ReactHtmlParser(this.state.res.it)}
                  <br></br>
                  &nbsp; <span> {ReactHtmlParser(this.state.res.it2)}</span>
                  <HelpOutlineIcon
                    id="homc"
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
            <section className="c3">
              <h2>
                {ReactHtmlParser(this.state.res.h2)}{" "}
                <ContactsIcon className="infe" />{" "}
              </h2>
              <hr />
              <Wave>
                <div className="prop">
                  <span id="sc">{ReactHtmlParser(this.state.res.avail)}</span>
                </div>
              </Wave>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
