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
      res: {},
      map: null,
      mapNames: null,
      load: true,
    };
    this.props.footer("loading");
  }
  componentDidMount() {
    axios
      .post(`/api-about`)
      .then((res) => {
        this.setState({
          res: res.data.a,
          mapNames: res.data.b.mapNames,
          map: <Maps data={res.data.b.data} />,
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
    this.height(document.querySelector("#readMoreOne"));
    this.height(document.querySelector("#readMoreTwo"));
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
              <h1>{parse(this.state.res.buttons[0])}</h1>
            </div>
            <section className="aboutContOne">
              <div className="grid">
                <h2>
                  {parse(this.state.res.headingMap)}
                  <ListAltIcon />
                </h2>
                <p>{parse(this.state.mapNames)}</p>
                <hr />
              </div>
              <div className="grid"> {this.state.map} </div>
            </section>
            <section className="aboutContTwo">
              <h2>
                {parse(this.state.res.headingMain)}
                <ListAltIcon />
              </h2>
              <hr />
              <Wave>
                <div className="prop">
                  <h3>{parse(this.state.res.headingOne)}</h3>
                  <span id="topSpan">{parse(this.state.res.spanOne)}</span>
                  <button
                    onClick={() => {
                      const obj = document.querySelector("#readMoreOne");
                      obj.style.maxHeight = obj.scrollHeight + "px";
                    }}
                  >
                    {parse(this.state.res.buttons[1])}
                  </button>
                  <div id="readMoreOne">
                    <hr />
                    <span>{parse(this.state.res.spanReadMoreOne)}</span>
                    <button
                      onClick={() => {
                        const obj = document.querySelector("#readMoreOne");
                        obj.style.maxHeight = "0";
                        obj.style.transition = "max-height 1s";
                      }}
                    >
                      {parse(this.state.res.buttons[2])}
                    </button>
                  </div>
                  <img id="divider"
                    src="https://candid.s3-ap-southeast-2.amazonaws.com/breakp.png"
                    alt="Swirly text divider"
                  />
                  <h3>{parse(this.state.res.headingTwo)}</h3>
                  <div id="picContainer">
                    <img src={this.state.res.image} id="pic"></img>
                  </div>
                  <span id="picSpan">{parse(this.state.res.spanTwo)}</span>
                  <button
                    className="btn"
                    onClick={() => {
                      const obj = document.querySelector("#readMoreTwo");
                      obj.style.maxHeight = obj.scrollHeight + "px";
                    }}
                  >
                    {parse(this.state.res.buttons[1])}
                  </button>
                  <div id="readMoreTwo">
                    <hr />
                    <span>{parse(this.state.res.spanReadMoreTwo)}</span>
                    <button
                      onClick={() => {
                        const obj = document.querySelector("#readMoreTwo");
                        obj.style.maxHeight = "0";
                        obj.style.transition = "max-height 1s";
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
