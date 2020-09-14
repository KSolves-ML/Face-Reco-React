import React from 'react';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


import App from '../App.js';
import AddNewUser from '../AddNewUser.js';
const history = createBrowserHistory();

export default function RouteComponent() {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/add_new_user/*" element={<AddNewUser />} />
    </Routes>
  );
}
