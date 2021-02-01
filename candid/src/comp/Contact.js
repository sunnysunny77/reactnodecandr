import React, { Component } from "react";
import "./Contact.css";
import Wave from "./Wave";
import ContactsIcon from "@material-ui/icons/Contacts";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser'; 

export default class Contactc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      ph: null,
      email: null,
      avail: null,
    };
  }
  componentDidMount() {
    axios
      .post(`/cont`)
      .then((res) => {
        if (res.data.e) {
          this.setState({
            ph: res.data.e.ph,
            email: res.data.e.email,
            avail: res.data.e.avail,
          });
        }
        if (res.data.a) {
          this.setState({
            ph: res.data.a.ph,
            email: res.data.a.email,
            avail: res.data.a.avail,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.w}
        <div className="rh">
          <h1>Contact</h1>
        </div>
        <section className="contlink">
          <div className="c1"></div>
          <div className="c2">
            <ContactsIcon className="infe" />
            <h2>Quick Contact</h2>
            <hr></hr>
            <p>
              &nbsp;&#8226;&nbsp;Email:
              <br></br>
              &nbsp;&nbsp;
              <a href="mailto:candidcleaningservice@gmail.com">
              {this.state.email}
              </a>
              <br></br>
              <br></br>
              &nbsp;&#8226;&nbsp;Phone:
              <br></br>
              &nbsp;&nbsp;<a href="tel:+0412620989"> {this.state.ph}</a>
              <br></br>
              <br></br>
              &nbsp;&#8226;&nbsp;Inquiries:
              <br></br>
              &nbsp; <span> Click the querry icon</span>
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
          <ContactsIcon className="infe" />
          <h2>Availability</h2>
          <hr></hr>
          <Wave>
            <div className="prop" ><span>{ReactHtmlParser (this.state.avail)}</span></div>
          </Wave>
        </section>
      </React.Fragment>
    );
  }
}
