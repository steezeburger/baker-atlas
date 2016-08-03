import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import Immutable from 'immutable';
import rasterTileStyle from 'raster-tile-style';

export default class BakerMap extends Component {
  constructor(props) {
    super(props);

    const tileSource = '//tile.stamen.com/toner/{z}/{x}/{y}.png';
    const mapStyle = Immutable.fromJS(rasterTileStyle([tileSource]));
    this.state = {
      viewport: {
        latitude: 37.78,
        longitude: -122.45,
        zoom: 11,
        width: 800,
        height: 800,
        startDragLngLat: null,
        isDragging: null
      },
      mapStyle: mapStyle
    };

    this._onChangeViewport = this._onChangeViewport.bind(this);
  }

  _onChangeViewport(newViewport) {
    var viewport = { ...this.state.viewport, ...newViewport };
    this.setState({viewport});
  }

  render() {
    const {mapStyle, viewport} = this.state;
    return <MapGL
      onChangeViewport={this._onChangeViewport}
      mapStyle={mapStyle}
      {...viewport}
    />
  }
}