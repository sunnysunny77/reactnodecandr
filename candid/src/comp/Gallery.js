import React, { Component } from "react";
import "./Gallery.scss";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

export default class Galery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      res: {},
      load: true,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
    axios.post(`/g`).then((res) => {
      this.setState({ res: res.data, load: false });
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
            <div className="galleryHeading headingCont">
              <h1> {ReactHtmlParser(this.state.res.buttons[0])}</h1>
            </div>
            <section id="galleryCont">
              <div className="wave0"></div>
              <ImageGallery items={this.state.res.images} />
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
