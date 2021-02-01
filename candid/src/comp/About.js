import React from "react";
import "./About.css";
import Wave from "./Wave";
import Maps from "./Maps.js";
import axios from "axios";
import ListAltIcon from "@material-ui/icons/ListAlt";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      abc: null,
      cba: null,
      hmap: null,
      hm: null,
      h1: null,
      span1: null,
      span2: null,
      h2: null,
      span3: null,
      span4: null,
    };
  }
  componentDidMount() {
    axios
      .post(`/abou`)
      .then((res) => {
        if (res.data.e) {
          this.setState({
            cba: res.data.e.cba,
            abc: res.data.e.abc,
            hmap: res.data.e.hmap,
            hm: res.data.e.hm,
            h1: res.data.e.h1,
            span1: res.data.e.span1,
            span2: res.data.e.span2,
            h2: res.data.e.h2,
            span3: res.data.e.span3,
            span4: res.data.e.span4,
          });
        }
        if (res.data.a) {
          this.setState({
            cba: res.data.a.cba,
            abc: <Maps data={res.data.a.abc} />,
            hmap: res.data.a.hmap,
            hm: res.data.a.hm,
            h1: res.data.a.h1,
            span1: res.data.a.span1,
            span2: res.data.a.span2,
            h2: res.data.a.h2,
            span3: res.data.a.span3,
            span4: res.data.a.span4,
          });
        }
      })
      .then((res) => {
        document.getElementById("s0").innerHTML = this.state.cba;
        document.getElementById("s1").innerHTML = this.state.span1;
        document.getElementById("s2").innerHTML = this.state.span2;
        document.getElementById("s3").innerHTML = this.state.span3;
        document.getElementById("s4").innerHTML = this.state.span4;
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
          <h1>About</h1>
        </div>

        <section className="about0">
          <ListAltIcon id="infe" />
          <h2>{this.state.hmap}</h2>
          <p className="jus" id="s0"></p>
          <hr />
        </section>

        <div>{this.state.abc}</div>

        <section className="about1">

          <ListAltIcon id="infe" />
          <h2>{this.state.hm}</h2>
          <hr />

          <Wave>

            <div className="prop">

              <h3>{this.state.h1}</h3>

              <div className="jus"><span id="s1"></span></div>
             
              <div className="jus">
                <br />
                <br />
                <button
                  className="cent0"
                  onClick={() => {
                    document.getElementById("rm").style.display = "block";
                  }}
                >
                  read more
                </button>
                <br />
                <br />
              </div>
              
              <div id="rm" className="cent">
                <hr />
                <br />
                <br />
                <span id="s2"></span>
                <br />
                <br />
                <button
                  className="cent0"
                  onClick={() => {
                    document.getElementById("rm").style.display = "none";
                  }}
                >
                  close
                </button>
                <br />
              </div>

              <div className="jus">
                <br />
                <br />
                <img src="breakp.jpg" alt="Smiley face" className="imga "></img>
                <br />
                <br />
              </div>
            
              <br />
              <br />
              <h3>{this.state.h2}</h3>
              <br />
              <span id="pic"></span>
              <span id="s3" className="jus"></span>
              <br />
              <br />
              <button
                id="btn"
                onClick={() => {
                  document.getElementById("rm1").style.display = "block";
                }}
              >         
                read more
              </button>
              <br /> 
              <br />
              <br />
              
              <div id="rm1" className="cent">
                <hr />
                <br />
                <br />
                <span id="s4"></span>
                <br />
                <br />
                <button
                  className="cent0"
                  onClick={() => {
                    document.getElementById("rm1").style.display = "none";
                  }}
                >
                  close
                </button>
                <br />
              </div>

            </div>

          </Wave>

        </section>

      </React.Fragment>
    );
  }
}
