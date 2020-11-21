import React, { Component } from 'react';
import { BrowserRouter,Switch, Route } from "react-router-dom";

import Navbar from '../components/Navbar/Navbar';
import Main from './main/Main'

import axios from 'axios';

class App extends Component {

  render() {
    return (
      <div className="home">
        <Navbar/>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={(props) => ( <Main {...props} />)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;