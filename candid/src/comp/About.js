import React from "react";
import "./About.scss";
import Wave from "./Wave";
import Maps from "./Maps.js";
import axios from "axios";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ReactHtmlParser from "react-html-parser";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      res: {},
      abc: null,
      cba: null,
      load: true,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    axios.post(`/abou`).then((res) => {
      this.setState({
        res: res.data.a,
        cba: res.data.b.cba,
        abc: <Maps data={res.data.b.abc} />,
        load: false,
      });
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
            <section className="aboutContOne">
              <div className="grid">
                <h2>
                  {ReactHtmlParser(this.state.res.hmap)}{" "}
                  <ListAltIcon />{" "}
                </h2>
                <p>{ReactHtmlParser(this.state.cba)}</p>
                <hr />
              </div>
              <div className="grid"> {this.state.abc} </div>
            </section>
            <section className="aboutContTwo">
              <h2>
                {ReactHtmlParser(this.state.res.hm)}{" "}
                <ListAltIcon />{" "}
              </h2>
              <hr />
              <Wave>
                <div className="prop">
                  <h3>{ReactHtmlParser(this.state.res.h1)}</h3>
                  <span id="topSpan">{ReactHtmlParser(this.state.res.span1)}</span>
                  <button
                    className="btn"
                    onClick={() => {
                      document.getElementById("readMoreZero").style.display = "block";
                    }}
                  >
                    {ReactHtmlParser(this.state.res.buttons[1])}
                  </button>
                  <div id="readMoreZero">
                    <hr />
                    <span>{ReactHtmlParser(this.state.res.span2)}</span>
                    <button
                      onClick={() => {
                        document.getElementById("readMoreZero").style.display = "none";
                      }}
                    >
                      {ReactHtmlParser(this.state.res.buttons[2])}
                    </button>
                  </div>
                  <img
                    src="https://candid.s3-ap-southeast-2.amazonaws.com/breakp.png"
                    alt="Swirly text divider"
                  />
                  <h3>{ReactHtmlParser(this.state.res.h2)}</h3>
                  <span id="pic"></span>
                  <span id="picSpan">
                    {ReactHtmlParser(this.state.res.span3)}
                  </span>
                  <button
                    className="btn"
                    onClick={() => {
                      document.getElementById("readMoreOne").style.display = "block";
                    }}
                  >
                    {ReactHtmlParser(this.state.res.buttons[1])}
                  </button>
                  <div id="readMoreOne">
                    <hr />
                    <span>{ReactHtmlParser(this.state.res.span4)}</span>
                    <button
                      onClick={() => {
                        document.getElementById("readMoreOne").style.display = "none";
                      }}
                    >
                      {ReactHtmlParser(this.state.res.buttons[2])}
                    </button>
                  </div>
                </div>
              </Wave>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
