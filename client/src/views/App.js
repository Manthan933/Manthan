import React, { Component } from 'react';
import { BrowserRouter,Switch, Route } from "react-router-dom";

import Main from './main/Main';
import Class from './classroom/Classroom';
import Test from './tests/Test';

import axios from 'axios';

export default function App () {
    return (
      <div className="home">
        <BrowserRouter>
          <Switch>
            <Route path="/" render={(props)=>(<Main {...props}/>)}/>
            <Route path="/:user/:class" render={(props)=>(<Class {...props}/>)}/>
            <Route path="/:user/:class/:test" render={(props)=>(<Test {...props}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
