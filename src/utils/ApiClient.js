import superagent from 'superagent';
import { Promise } from 'bluebird';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return config.apiHost + adjustedPath;
}

/**
 * This client uses superagent to make ajax requests -
 * All verb methods return a promise
 */
export default class ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data, token } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if(params) {
          request.query(params);
        }

        if(token) {
          request.set('Authorization', `Bearer ${token}`);
        }

        if(data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => {
          // print error before rejecting - non production
          if(err) {
            console.log('%c network error ', 'background: red; color: white', formatUrl(path), params, data, err);
          }
          err ? reject(body || err) : resolve(body);
        });
      }));
  }

  // hack - https://phabricator.babeljs.io/T2455
  empty() {
  }

}
