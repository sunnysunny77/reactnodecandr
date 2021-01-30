import React, { Component } from "react";
import "./Contact.css";
import Wave from "./Wave";
import ContactsIcon from "@material-ui/icons/Contacts";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import axios from "axios";
import Papa from "papaparse";

export default class Contactc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      ph: null,
      email: null,
      avail: null
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vTxrFaopZW6GRYomtmnq53N7fFznDije-jPZkhiWT0mQCtgGwo8C6L-7AT-1LRb05G9kmojifMC8k9T/pub?output=csv`
      )
      .then((res) => {
        let parsedData = Papa.parse(res.data);
        this.setState({
          ph: String(parsedData.data[0][0]),
          email: String(parsedData.data[3][0]),
          avail: String(parsedData.data[4][0]),
        });
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
        </div>

        <div className="c3">
          <ContactsIcon className="infe" />
          <h4>Availability</h4>
          <hr></hr>
          <Wave>
            <p className="p">
            {this.state.avail}
            </p>
          </Wave>
        </div>
      </React.Fragment>
    );
  }
}
