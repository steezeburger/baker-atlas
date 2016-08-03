import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import ScatterPlotOverlay from 'react-map-gl/dist/overlays/scatterplot.react';
import Immutable from 'immutable';
import rasterTileStyle from 'raster-tile-style';
import Dimensions from 'react-dimensions';

const retreiveLocationHistory = () => {
  let locations = require('json!../../../data/providerLocations.json');
  locations = locations.map( loc => ([loc.lon, loc.lat]) );
  locations = Immutable.fromJS(locations);
  return locations;
};

class BakerMap extends Component {
  constructor(props) {
    super(props);

    const tileSource = '//tile.stamen.com/toner/{z}/{x}/{y}.png';
    const mapStyle = Immutable.fromJS(rasterTileStyle([tileSource]));

    const { containerWidth, containerHeight } = props;

    this.state = {
      viewport: {
        latitude: 39.7392,
        longitude: -104.9903,
        zoom: 9,
        width: containerWidth || 500,
        height: containerHeight || 500,
        startDragLngLat: null,
        isDragging: null
      },
      mapStyle: mapStyle,
      locations: retreiveLocationHistory()
    };

    this._onChangeViewport = this._onChangeViewport.bind(this);
    this._updateSize = this._updateSize.bind(this);
  }

  // FIXME this only sizes to full height when resizing - can't get it to render this way
  componentWillReceiveProps(newProps) {
    this._updateSize(newProps);
  }

  _onChangeViewport(newViewport) {
    const viewport = { ...this.state.viewport, ...newViewport };
    this.setState({ viewport });
  }

  _updateSize(newProps) {
    const { containerWidth, containerHeight } = newProps;
    console.log(containerWidth, containerHeight);
    if(containerWidth && containerHeight) {
      this.setState({ viewport: { ...this.state.viewport, height: containerHeight, width: containerWidth } });
    }
  }

  render() {
    const { mapStyle, viewport, locations } = this.state;
    return (
      <MapGL ref="mapComponent"
             onChangeViewport={this._onChangeViewport}
             mapStyle={mapStyle}
             {...viewport}>
        <ScatterPlotOverlay
          {...viewport}
          locations={locations}
          dotRadius={5}
          globalOpacity={1}
          compositeOperation="multiply"
          dotFill="#73FF93"
          renderWhileDragging={true}
          isDragging={true}
        />
      </MapGL>
    );
  }
}

export default Dimensions()(BakerMap);