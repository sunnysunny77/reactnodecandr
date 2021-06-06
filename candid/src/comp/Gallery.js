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
      images: [],
      buttons: [],
      load: true,
    };
  }
  componentDidMount() {
    axios
      .post(`https://candidcleaning.sunnyhome.site/g`)
      .then((res) => {
        if (res.data.e) {
          this.setState({
            images: res.data.e.images,
            buttons: res.data.e.buttons,
          });
        }
        if (res.data.a) {
          this.setState({
            images: res.data.a.images,
            buttons: res.data.a.buttons,
          });
        }
      })
      .then(() => {
        this.setState({ load: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.load ? (
          <img
            className="load"
            src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
            alt="loading"
          />
        ) : (
          <React.Fragment>
            {this.state.w}
            {this.props.setLoad("block")}
            <div className="rh">
              <h1> {ReactHtmlParser(this.state.buttons[0])}</h1>
            </div>
            <section id="gl">
              <ImageGallery items={this.state.images} />
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
