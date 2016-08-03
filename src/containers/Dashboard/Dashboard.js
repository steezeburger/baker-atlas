import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { BakerMap } from 'components';

class Dashboard extends Component {
  render() {
    const styles = require('./Dashboard.scss');
    return (
      <div id="dashboard" className={styles.dashboard}>
        <Helmet title="Baker Atlas"/>
        <BakerMap />
      </div>
    );
  }
}

export default Dashboard;