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
    if (this.state.load) {
      this.props.setLoad("none");
    }
    axios
      .post(`/abou`)
      .then((res) => {
        this.setState({
          res: res.data.a,
          cba: res.data.b.cba,
          abc: <Maps data={res.data.b.abc} />,
          load: false,
        });
        this.props.setLoad("block");
      })
      .catch((error) => {
        alert(error);
      });
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
            <div className="headingCont">
              <h1>{ReactHtmlParser(this.state.res.buttons[0])}</h1>
            </div>
            <section className="aboutContOne">
              <h2>
                {ReactHtmlParser(this.state.res.hmap)}{" "}
                <ListAltIcon />{" "}
              </h2>
              <p className="center">{ReactHtmlParser(this.state.cba)}</p>
              <hr />
            </section>
            <div>{this.state.abc}</div>
            <section className="aboutContTwo">
              <h2>
                {ReactHtmlParser(this.state.res.hm)}{" "}
                <ListAltIcon />{" "}
              </h2>
              <hr />
              <Wave>
                <div className="prop">
                  <h3>{ReactHtmlParser(this.state.res.h1)}</h3>
                  <div className="center">
                    <span>{ReactHtmlParser(this.state.res.span1)}</span>
                  </div>
                  <div className="center">
                    <br />
                    <br />
                    <button
                      className="btn"
                      onClick={() => {
                        document.getElementById("readMoreZero").style.display = "block";
                      }}
                    >
                      {ReactHtmlParser(this.state.res.buttons[1])}
                    </button>
                    <br />
                    <br />
                    <br />
                  </div>
                  <div id="readMoreZero" className="justify">
                    <hr />
                    <br />
                    <br />
                    <span>{ReactHtmlParser(this.state.res.span2)}</span>
                    <br />
                    <br />
                    <button
                      className="centerBlock"
                      onClick={() => {
                        document.getElementById("readMoreZero").style.display = "none";
                      }}
                    >
                      {ReactHtmlParser(this.state.res.buttons[2])}
                    </button>
                    <br />
                  </div>
                  <div className="center">
                    <br />
                    <br />
                    <img
                      src="https://candid.s3-ap-southeast-2.amazonaws.com/breakp.png"
                      alt="Swirly text divider"
                    ></img>
                    <br />
                    <br />
                  </div>
                  <br />
                  <br />
                  <h3>{ReactHtmlParser(this.state.res.h2)}</h3>
                  <br />
                  <span id="pic"></span>
                  <span id="picSpan">
                    {ReactHtmlParser(this.state.res.span3)}
                  </span>
                  <br />
                  <br />
                  <button
                   className="btn"
                    onClick={() => {
                      document.getElementById("readMoreOne").style.display = "block";
                    }}
                  >
                    {ReactHtmlParser(this.state.res.buttons[1])}
                  </button>
                  <br />
                  <br />
                  <br />
                  <div id="readMoreOne" className="justify">
                    <hr />
                    <br />
                    <br />
                    <span>{ReactHtmlParser(this.state.res.span4)}</span>
                    <br />
                    <br />
                    <button
                      className="centerBlock"
                      onClick={() => {
                        document.getElementById("readMoreOne").style.display = "none";
                      }}
                    >
                      {ReactHtmlParser(this.state.res.buttons[2])}
                    </button>
                    <br />
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
