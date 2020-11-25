import React from 'react';
import { BrowserRouter,Switch, Route } from "react-router-dom";

import Main from './main/Main';
import Class from './classroom/Classroom';
import Test from './tests/Test';

export default function App () {
  return (
    <div className = "home">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props)=>(<Main {...props}/>)}/>
          <Route path="/:class" render={(props)=>(<Class {...props}/>)}/>
          <Route path="/:class/:test" render={(props)=>(<Test {...props}/>)}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}