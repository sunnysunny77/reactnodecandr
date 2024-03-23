import React, { Component } from "react";
import "./Gallery.scss";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import parse from 'html-react-parser';

export default class Galery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: window.scrollTo(0, 0),
      res: {},
      load: true,
    };
    this.props.footer("loading");
  }
  componentDidMount() {
    axios.post(`/api-gallery`).then((res) => {
      this.setState({ res: res.data, load: false });
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
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
  }
  handleScroll = () => {
    if (window.innerWidth > 1200) return document.querySelector(".sticky").style.top = "40px";
    if (window.innerWidth <= 1200) document.querySelector(".sticky").style.top = "0px";
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
            <div className="galleryHeading headingCont">
              <h1> {parse(this.state.res.buttons[0])}</h1>
            </div>
            <section id="galleryCont">
              <div className="sticky"></div>
              <ImageGallery items={this.state.res.images} />
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
