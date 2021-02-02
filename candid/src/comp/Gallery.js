import React, { Component } from "react";
import "./Gallery.scss";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser'; 

export default class Galery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      images: [],
      buttons: [],
    };
  }
  componentDidMount() {
   axios
      .post(`/g`)
      .then((res) => {
        if (res.data.e) {
          this.setState({images: res.data.e.images, buttons: res.data.e.buttons})
        }
        if (res.data.a) {
         this.setState({images: res.data.a.images, buttons: res.data.a.buttons})
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
          <h1> {ReactHtmlParser (this.state.buttons[0])}</h1>
        </div>
        <section id="gl">
          <ImageGallery items={this.state.images} />
        </section>
      </React.Fragment>
    );
  }
}
