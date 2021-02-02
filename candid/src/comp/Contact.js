import React, { Component } from "react";
import "./Contact.scss";
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
      h: null,
      er: null,
      pt: null,
      it: null,
      it2: null,
      h2: null,
      buttons: [],
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
            h: res.data.e.h,
            et: res.data.e.et,
            pt: res.data.e.pt, 
            it: res.data.e.it, 
            it2: res.data.e.it2,
            h2: res.data.e.h2,
            buttons: res.data.e.buttons, 
           })
        }
        if (res.data.a) {
          this.setState({
            ph: res.data.a.ph, 
            email: res.data.a.email, 
            avail: res.data.a.avail,
            h: res.data.a.h,
            et: res.data.a.et,
            pt: res.data.a.pt, 
            it: res.data.a.it, 
            it2: res.data.a.it2,
            h2: res.data.a.h2,
            buttons: res.data.a.buttons, 
           })
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
          <h1>{ReactHtmlParser (this.state.buttons[0])}</h1>
        </div>
        <section className="contlink">
          <div className="c1"></div>
          <div className="c2">
            <ContactsIcon className="infe" />
            <h2>{ReactHtmlParser (this.state.h)}</h2>
            <hr></hr>
            <p>
              &nbsp;&#8226;&nbsp;{ReactHtmlParser (this.state.et)}
              <br></br>
              &nbsp;&nbsp;
              <a href={"mailto:" + this.state.email}>
              {this.state.email}
              </a>
              <br></br>
              <br></br>
              &nbsp;&#8226;&nbsp;{ReactHtmlParser (this.state.pt)}
              <br></br>
              &nbsp;&nbsp;<a href={"tel:" + this.state.ph}> 
              {this.state.ph}
              </a>
              <br></br>
              <br></br>
              &nbsp;&#8226;&nbsp;{ReactHtmlParser (this.state.it)}
              <br></br>
              &nbsp; <span> {ReactHtmlParser (this.state.it2)}</span>
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
          <h2>{ReactHtmlParser (this.state.h2)}</h2>
          <hr></hr>
          <Wave>
            <div className="prop" ><span id="sc" >{ReactHtmlParser (this.state.avail)}</span></div>
          </Wave>
        </section>
      </React.Fragment>
    );
  }
}
