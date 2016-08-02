/**
 *
 * This middleware allows us to do some cool stuff with Promises in our action creators
 *
 * The types array contains the actions that will be dispatched for
 * request, receiving a proper response, and receiving an error response, respectively.
 *
 * @param client
 * @returns {function()}
 */

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if(typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if(!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => next({ ...rest, result, type: SUCCESS }),
        (error) => next({ ...rest, error, type: FAILURE })
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({ ...rest, error, type: FAILURE });
      });

      return actionPromise;
    };
  };
}