import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../components/Main.jsx';
const AppRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
