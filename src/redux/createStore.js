import { createStore as _createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
// custom
import createMiddleware from 'middleware/clientMiddleware';

export default function createStore(history, client, data) {
  // middlewares
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [createMiddleware(client), reduxRouterMiddleware];
  // actually creating the store, with our reducers
  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const reducer = require('./modules/_reducer');
  const store = finalCreateStore(reducer, data);
  return store;
}
