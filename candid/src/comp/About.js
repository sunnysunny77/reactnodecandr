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
    axios
      .post(`http://localhost:3005/abou`)
      .then((res) => {
        this.setState({
          res: res.data.a,
          cba: res.data.b.cba,
          abc: <Maps data={res.data.b.abc} />,
        });
      })
      .then(() => {
        this.setState({ load: false });
        this.props.setLoad("block");
      })
      .catch((error) => {
        alert(error);
      });
    if (this.state.load) {
      this.props.setLoad("none");
    }
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
            <div className="rh">
              <h1>{ReactHtmlParser(this.state.res.buttons[0])}</h1>
            </div>
            <section className="about0">
              <h2>
                {ReactHtmlParser(this.state.res.hmap)}{" "}
                <ListAltIcon className="infa" />{" "}
              </h2>
              <p className="jus">{ReactHtmlParser(this.state.cba)}</p>
              <hr />
            </section>
            <div>{this.state.abc}</div>
            <section className="about1">
              <h2>
                {ReactHtmlParser(this.state.res.hm)}{" "}
                <ListAltIcon className="infa" />{" "}
              </h2>
              <hr />
              <Wave>
                <div className="prop">
                  <h3>{ReactHtmlParser(this.state.res.h1)}</h3>
                  <div className="jus">
                    <span>{ReactHtmlParser(this.state.res.span1)}</span>
                  </div>
                  <div className="jus">
                    <br />
                    <br />
                    <button
                      className="cent0"
                      onClick={() => {
                        document.getElementById("rm").style.display = "block";
                      }}
                    >
                      {ReactHtmlParser(this.state.res.buttons[1])}
                    </button>
                    <br />
                    <br />
                  </div>
                  <div id="rm" className="cent">
                    <hr />
                    <br />
                    <br />
                    <span>{ReactHtmlParser(this.state.res.span2)}</span>
                    <br />
                    <br />
                    <button
                      className="cent0"
                      onClick={() => {
                        document.getElementById("rm").style.display = "none";
                      }}
                    >
                      {ReactHtmlParser(this.state.res.buttons[2])}
                    </button>
                    <br />
                  </div>
                  <div className="jus">
                    <br />
                    <br />
                    <img
                      src="https://candid.s3-ap-southeast-2.amazonaws.com/breakp.png"
                      alt="Swirly text divider"
                      className="imga "
                    ></img>
                    <br />
                    <br />
                  </div>
                  <br />
                  <br />
                  <h3>{ReactHtmlParser(this.state.res.h2)}</h3>
                  <br />
                  <span id="pic"></span>
                  <span id="s3" className="jus">
                    {ReactHtmlParser(this.state.res.span3)}
                  </span>
                  <br />
                  <br />
                  <button
                    id="btn"
                    onClick={() => {
                      document.getElementById("rm1").style.display = "block";
                    }}
                  >
                    {ReactHtmlParser(this.state.res.buttons[1])}
                  </button>
                  <br />
                  <br />
                  <br />
                  <div id="rm1" className="cent">
                    <hr />
                    <br />
                    <br />
                    <span>{ReactHtmlParser(this.state.res.span4)}</span>
                    <br />
                    <br />
                    <button
                      className="cent0"
                      onClick={() => {
                        document.getElementById("rm1").style.display = "none";
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
