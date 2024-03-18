import React from "react";
import "./About.scss";
import Wave from "./Wave";
import Maps from "./Maps.js";
import axios from "axios";
import ListAltIcon from "@mui/icons-material/ListAlt";
import parse from 'html-react-parser';

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
    this.props.footer("loading");
  }
  componentDidMount() {
    axios.post(`/abou`).then((res) => {
      this.setState({
        res: res.data.a,
        cba: res.data.b.cba,
        abc: <Maps data={res.data.b.abc} />,
        load: false,
      });
      this.props.footer("load");
    })
      .catch((error) => {
        alert(error);
      });
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
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
            <section className="aboutContOne">
              <div className="grid">
                <h2>
                  {parse(this.state.res.hmap)}{" "}
                  <ListAltIcon />{" "}
                </h2>
                <p>{parse(this.state.cba)}</p>
                <hr />
              </div>
              <div className="grid"> {this.state.abc} </div>
            </section>
            <section className="aboutContTwo">
              <h2>
                {parse(this.state.res.hm)}{" "}
                <ListAltIcon />{" "}
              </h2>
              <hr />
              <Wave>
                <div className="prop">
                  <h3>{parse(this.state.res.h1)}</h3>
                  <span id="topSpan">{parse(this.state.res.span1)}</span>
                  <button
                    className="btn"
                    onClick={ function () {
                      const obj = document.getElementById("readMoreZero");
                      obj.style.height = obj.scrollHeight + "px";
                 }}
                  >
                    {parse(this.state.res.buttons[1])}
                  </button>
                  <div id="readMoreZero">
                    <hr />
                    <span>{parse(this.state.res.span2)}</span>
                    <button
                      onClick={() => {
                        document.getElementById("readMoreZero").style.height = "0";
                      }}
                    >
                      {parse(this.state.res.buttons[2])}
                    </button>
                  </div>
                  <img
                    src="https://candid.s3-ap-southeast-2.amazonaws.com/breakp.png"
                    alt="Swirly text divider"
                  />
                  <h3>{parse(this.state.res.h2)}</h3>
                  <span id="pic"></span>
                  <span id="picSpan">
                    {parse(this.state.res.span3)}
                  </span>
                  <button
                    className="btn"
                    onClick={() => {
                      const obj = document.getElementById("readMoreOne");
                      obj.style.height = obj.scrollHeight + "px";
                    }}
                  >
                    {parse(this.state.res.buttons[1])}
                  </button>
                  <div id="readMoreOne">
                    <hr />
                    <span>{parse(this.state.res.span4)}</span>
                    <button
                      onClick={() => {
                        document.getElementById("readMoreOne").style.height = "0";
                      }}
                    >
                      {parse(this.state.res.buttons[2])}
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
