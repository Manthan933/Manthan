import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./main/Main";
import Class from "./classroom/Classroom";
import CreateTest from "../components/Froms/CreateTest";
import Navbar from "../components/Navbar/Navbar";
import Test from "./test/Test";
import { getClasses, editClassDetails } from "../actions/actions";

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
            render={(props) => (
              <Main
                {...props}
                user={user}
                Classes={Classes}
                setClasses={setClasses}
                UpdateClass={UpdateClass}
              />
            )}
          />
          <Route
            path='/:classCode/:admin'
            render={(props) => <Class {...props} />}
          />
          <Route
            path='/:classCode/'
            render={(props) => <CreateTest {...props} />}
          />
          <Route
            path='/:testid/start/'
            render={(props) => <Test {...props} user={user} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
