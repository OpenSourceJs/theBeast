import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../container/Auth/SignUp/SignUp';
import SignIn from '../container/Auth/SignIn/SignIn';
import SignOut from '../container/Auth/SignOut/SignOut';
import RequireAuth from '../container/Auth/RequireAuth';
import Feature from '../container/Feature/Feature';
import GetStarted from './GetStarted';
import Main from '../components/Main/Main';

const AppRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signout" component={SignOut} />
        <Route path="/feature" component={RequireAuth(Feature)} />
        <Route path="/getstarted" component={GetStarted} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
