import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";

import Main from "./main/Main";
import Class from "./classroom/Classroom";
import Test from "./tests/Test";
import Navbar from "../components/Navbar/Navbar";
import { getClasses } from "../actions/actions";
import { Typography, Link } from "@material-ui/core";

export default function App() {
  const [user, setUser] = React.useState({});
  const [Classes, setClasses] = React.useState([]);
  React.useEffect(() => {
    getClasses(user.email, setClasses);
  }, [user]);
  return (
    <div className="home">
      <Navbar
        user={user}
        setUser={setUser}
        Classes={Classes}
        setClasses={setClasses}
      />
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Main
                {...props}
                user={user}
                Classes={Classes}
                setClasses={setClasses}
              />
            )}
          />
          <Route path="/:classCode/:admin" render={(props) => <Class {...props}/>} />
          <Route path="/:classCode/" render={(props) => <Test {...props} />} />
          <Route path="/:class/:test/start" render={(props) => <Test {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
