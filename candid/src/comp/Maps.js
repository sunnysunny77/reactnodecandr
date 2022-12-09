import React, { Component } from "react";
import MapGL, {
  NavigationControl,
  FullscreenControl,
  Source,
  Layer,
} from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: -31.9590544,
        longitude: 115.8353351,
        zoom: 9,
      },
      data: props.data,
      map: null,
    };
  }
  componentDidMount() {
    this.setState({
      map: this.state.data.map((key, index) => {
        return (
          <React.Fragment key={index}>
            <Source
              id={"data" + index}
              type="geojson"
              data={this.state.data[index][index + 1]}
            />
            <Layer
              id={"data" + index}
              type="fill"
              source={"data" + index}
              paint={{
                "fill-color": "#088",
                "fill-opacity": 0.8,
              }}
            />
          </React.Fragment>
        );
      }),
    });
  }
  render() {
    return (
      <MapGL
        style={{ width: "100%", height: "300px" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        accessToken={
          "pk.eyJ1Ijoic3N1bm55Nzc3IiwiYSI6ImNramU4cDlmYzAzbjEyc2xvYTR0ajhiMzcifQ.uHe7M4xAJcfbi5UfZdU6gQ"
        }
        latitude={this.state.viewport.latitude}
        longitude={this.state.viewport.longitude}
        zoom={this.state.viewport.zoom}
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        <NavigationControl showCompass showZoom position="top-right" />
        <FullscreenControl container={document.querySelector("cont")} />
        {this.state.map}
      </MapGL>
    );
  }
}
