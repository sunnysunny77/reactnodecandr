import React, { Component } from "react";
import "./Gallery.css";
import ImageGallery from "react-image-gallery";
import axios from "axios";

export default class Galery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      images: [],
    };
  }
  componentDidMount() {
   axios
      .post(`/g`)
      .then((res) => {
        if (res.data.e) {
          this.setState({images: res.data.e.images})
        }
        if (res.data.a) {
         this.setState({images: res.data.a.images})
        }
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
          <h1>Gallery</h1>
        </div>
        <section id="gl">
          <ImageGallery items={this.state.images} />
        </section>
      </React.Fragment>
    );
  }
}
