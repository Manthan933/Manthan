import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Classroom from '../classroom/Classroom';
import CreateTest from '../tests/CreateTest';
import Test from '../tests/Test';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import JoinClass from '../classroom/JoinClass';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/class/:code" component={Classroom} />
        <PrivateRoute path="/create/:code" component={CreateTest} />
        <PrivateRoute path="/join/:code" component={JoinClass} />
        <PrivateRoute path="/test/:id" component={Test} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
