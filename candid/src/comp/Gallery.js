import React, { Component } from "react";

import "./Gallery.css";

import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://candidcleaning.sunnyhome.site/gal/c1.jpg",
    thumbnail: "https://candidcleaning.sunnyhome.site/gal/c1.jpg",
  },
  {
    original: "https://candidcleaning.sunnyhome.sitegal/c2.jpg",
    thumbnail: "https://candidcleaning.sunnyhome.site/gal/c2.jpg",
  },
  {
    original: "https://candidcleaning.sunnyhome.site/gal/c3.jpg",
    thumbnail: "https://candidcleaning.sunnyhome.site/gal/c3.jpg",
  },
  {
    original: "https://candidcleaning.sunnyhome.site/gal/c4.jpg",
    thumbnail: "https://candidcleaning.sunnyhome.site/gal/c4.jpg",
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
      <div id="di" style={{ minHeight: "100vh" }}>
        {this.state.w}
        <div className="gg">
          <div className="rh">
            <h6>Gallery</h6>
          </div>
          <div id="gl">
            <ImageGallery items={images} />
          </div>
        </div>
      </div>
    );
  }
}
