import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Helmet title="Baker Atlas"/>
        <h1>Dashboard</h1>
      </div>
    );
  }
}
