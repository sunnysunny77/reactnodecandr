import React, { Component } from "react";
import "./Wave.scss";

export default class Wave extends Component {
  render() {
  return (
    <div className="svg">
      <div className="sticky"></div>
      {this.props.children} 
      <div className="wave">
      </div>
    </div>
  );
  }
}
