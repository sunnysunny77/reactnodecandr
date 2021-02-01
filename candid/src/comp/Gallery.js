import React, { Component } from "react";
import "./Gallery.css";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://candid.s3-ap-southeast-2.amazonaws.com/c1.jpg",
    thumbnail: "https://candid.s3-ap-southeast-2.amazonaws.com/c1.jpg",
  },
  {
    original: "https://candid.s3-ap-southeast-2.amazonaws.com/c2.jpg",
    thumbnail: "https://candid.s3-ap-southeast-2.amazonaws.com/c2.jpg",
  },
  {
    original: "https://candid.s3-ap-southeast-2.amazonaws.com/c3.jpg",
    thumbnail: "https://candid.s3-ap-southeast-2.amazonaws.com/c3.jpg",
  },
  {
    original: "https://candid.s3-ap-southeast-2.amazonaws.com/c4.jpg",
    thumbnail: "https://candid.s3-ap-southeast-2.amazonaws.com/c4.jpg",
  },
];

export default class Galery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
    };
  }
  render() {
    return (
      <React.Fragment>
        {this.state.w}
        <div className="rh">
          <h1>Gallery</h1>
        </div>
        <section id="gl">
          <ImageGallery items={images} />
        </section>
      </React.Fragment>
    );
  }
}
