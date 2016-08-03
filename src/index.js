import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
// custom
import createStore from './redux/createStore';
import ApiClient from './utils/ApiClient';
import getRoutes from './routes';

const client = new ApiClient();
const store = createStore(hashHistory, client);
const history = syncHistoryWithStore(hashHistory, store);

const component = (
  <Router history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider key="provider"
            store={store}
            render={applyRouterMiddleware(useScroll())}>
    {component}
  </Provider>,
  document.getElementById('baker-atlas')
);
