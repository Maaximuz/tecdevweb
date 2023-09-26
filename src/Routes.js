import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cadastro from './Pages/Cadastro.js';
import Login from './Pages/Login';
import Principal from './Pages/Principal';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/login" component={Login} />
        <Route path="/principal" component={Principal} />
      </Switch>
    </Router>
  );
}

export default Routes;