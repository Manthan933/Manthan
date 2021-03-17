import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import JoinNewClass from "./joinClassWithLink/JoinClass";
import CreateTest from "../components/Froms/CreateTest";
import Navbar from "../components/Navbar/Navbar";

import Main from "./main/Main";
import Class from "./classroom/Classroom";
import Test from "./test/Test";

import { getClasses, editClassDetails, joinClass } from "../actions/actions";
import { Redirect } from "react-router-dom";
export default function App() {
  const [user, setUser] = React.useState({});
  const [Classes, setClasses] = React.useState([]);
  React.useEffect(() => {
    getClasses(user.email, setClasses);
  }, [user]);
  const UpdateClass = (classDetails, updatedConfig) => {
    editClassDetails(classDetails, updatedConfig, user.email, setClasses);
  };
  return (
    <div className='home'>
      <Navbar
        user={user}
        setUser={setUser}
        Classes={Classes}
        setClasses={setClasses}
      />
      <BrowserRouter>
        <Switch>
          <Route
            path='/'
            exact
            render={(props) => (<Main {...props} user={user} Classes={Classes} setClasses={setClasses} UpdateClass={UpdateClass} />
            )}
          />
          <Route
            path='/:test_id/start'
            render={(props) => <Test {...props} user={user} />}
          />
          <Route exact render={(props) => <JoinNewClass {...props} user={user} Classes={Classes} setClasses={setClasses} />} path="/join/:code">

            {/* <Redirect /> */}
          </Route>
          <Route
            path='/:classCode/:admin'
            render={(props) => <Class joinClass={joinClass} {...props} />}
          />
          <Route
            path='/:classCode/'
            render={(props) => <CreateTest {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </div >
  );
}




