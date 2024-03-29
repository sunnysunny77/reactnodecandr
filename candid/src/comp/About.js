import React from "react";
import "./About.scss";
import Wave from "./Wave";
import Maps from "./Maps.js";
import axios from "axios";
import ListAltIcon from "@mui/icons-material/ListAlt";
import parse from "html-react-parser";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      window: window.scrollTo(0, 0),
      navigation: props.navigation,
      res: {},
      map: null,
      load: true,
    };
    this.props.footer("loading");
  }
  componentDidMount() {
    axios
      .post(`/api-about`)
      .then((res) => {
        this.setState({
          res: res.data.A,
          map: <Maps data={res.data.B.Data} />,
          load: false,
        });
        this.props.footer("load");
      })
      .catch((error) => {
        alert(error);
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.load !== this.state.load) {
      window.addEventListener("scroll", this.handleScroll, { passive: true });
      window.addEventListener("resize", this.handleScroll, { passive: true });
      window.addEventListener("resize", this.handleHeight, { passive: true });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
    window.removeEventListener("resize", this.handleHeight);
  }
  handleScroll = () => {
    if (window.innerWidth > 1200)
      return (document.querySelector(".sticky").style.top = "40px");
    if (window.innerWidth <= 1200)
      document.querySelector(".sticky").style.top = "0px";
  };
  height = (obj) => {
    if (obj.offsetHeight > 0 && obj.offsetHeight !== obj.scrollHeight) {
      obj.style.maxHeight = obj.scrollHeight + "px";
      obj.style.transition = "none";
    }
  };
  handleHeight = () => {
    this.height(document.querySelector("#moreOne"));
    this.height(document.querySelector("#moreTwo"));
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
            {this.state.window}
            <div className="headingCont">
              <h1> {parse(this.state.navigation)} </h1>
            </div>
            <section className="aboutContOne">
              <div className="grid">
                <h2>
                  {parse(this.state.res.Heading_One)}
                  <ListAltIcon />
                </h2>
                <p>{parse(this.state.res.Map_Names)}</p>
                <hr />
              </div>
              <div className="grid"> {this.state.map} </div>
            </section>
            <section className="aboutContTwo">
              <h2>
                {parse(this.state.res.Heading_Two)}
                <ListAltIcon />
              </h2>
              <hr />
              <Wave>
                <div className="prop">
                  <h3>{parse(this.state.res.Heading_Three)}</h3>
                  <span id="spanOne">{parse(this.state.res.Span_One)}</span>
                  <button
                    onClick={() => {
                      const obj = document.querySelector("#moreOne");
                      obj.style.maxHeight = obj.scrollHeight + "px";
                    }}
                  >
                    {parse(this.state.res.More_Button)}
                  </button>
                  <div id="moreOne">
                    <hr />
                    <span>{parse(this.state.res.Span_One_More)}</span>
                    <button
                      onClick={() => {
                        const obj = document.querySelector("#moreOne");
                        obj.style.maxHeight = "0";
                        obj.style.transition = "max-height 1s";
                      }}
                    >
                      {parse(this.state.res.More_Close_Button)}
                    </button>
                  </div>
                  <img
                    id="divider"
                    src="https://candid.s3-ap-southeast-2.amazonaws.com/divider.png"
                    alt="Artisic Divider"
                  />
                  <h3>{parse(this.state.res.Heading_Four)}</h3>
                  <div id="imageContainer">
                    <img
                      alt={this.state.res.Image_Alt}
                      src={this.state.res.Image}
                    ></img>
                  </div>
                  <span id="spanTwo">{parse(this.state.res.Span_Two)}</span>
                  <button
                    onClick={() => {
                      const obj = document.querySelector("#moreTwo");
                      obj.style.maxHeight = obj.scrollHeight + "px";
                    }}
                  >
                    {parse(this.state.res.More_Button)}
                  </button>
                  <div id="moreTwo">
                    <hr />
                    <span>{parse(this.state.res.Span_Two_More)}</span>
                    <button
                      onClick={() => {
                        const obj = document.querySelector("#moreTwo");
                        obj.style.maxHeight = "0";
                        obj.style.transition = "max-height 1s";
                      }}
                    >
                      {parse(this.state.res.More_Close_Button)}
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
