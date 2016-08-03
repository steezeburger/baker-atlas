import React, { Component } from 'react';
import Helmet from 'react-helmet';
import MapGL from 'react-map-gl';

import { BakerMap } from 'components';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Helmet title="Baker Atlas"/>
        <h1>Dashboard</h1>
        <BakerMap />
      </div>
    );
  }
}
