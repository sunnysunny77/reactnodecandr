import React, { Component } from "react";
import "./Contact.css";
import Wave from "./Wave";
import ContactsIcon from "@material-ui/icons/Contacts";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

export default class Contactc extends Component {
  constructor(props) {
    super(props);
    this.state = {
     w: window.scrollTo(0, 0),
    };
  }
  render() {
    return (
      <React.Fragment>
         {this.state.w}
        <div className="rh">
          <h6>Contact</h6>
        </div>

        <div className="contlink">
          <div className="c1"></div>
          <div className="c2">
            <ContactsIcon className="infe" />
            <h4>Quick Contact</h4>
            <hr></hr>
            <p>
              &nbsp;&#8226;&nbsp;Email:
              <br></br>
              &nbsp;&nbsp;
              <a href="mailto:candidcleaningservice@gmail.com">
                candidcleaningservice@gmail.com
              </a>
              <br></br>
              <br></br>
              &nbsp;&#8226;&nbsp;Phone:
              <br></br>
              &nbsp;&nbsp;<a href="tel:+0412620989">0412620989</a>
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
        </div>

        <div className="c3">
          <ContactsIcon className="infe" />
          <h4>Availability</h4>
          <hr></hr>
          <Wave>
            <p className="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Wave>
        </div>
      </React.Fragment>
    );
  }
}
