import React from 'react';
import { Route } from 'react-router';
import { Dashboard, NotFound } from './containers';

export default (store) => {
  return (
    <Route>
      {/* only route for now */}
      <Route path="/" component={Dashboard}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>

  );
};
