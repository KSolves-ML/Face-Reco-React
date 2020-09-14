import React from 'react';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from '../App.js';
import AddNewUser from '../AddNewUser.js';
const history = createBrowserHistory();

export default function Routes() {

  return (
    <Router history={history}>
      <Switch>
        <Route path="/add_new_user">
          <AddNewUser history={history}/>
        </Route>
        <Route path="/" exact>
          <App  history={history}/>
        </Route>
      </Switch>
    </Router>
  );
}
