import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import NotFound from './components/layout/NotFound';
import { LOGOUT } from './actions/types';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
const useStyles = makeStyles((theme) => ({

  back: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "auto",
    minHeight: "100vh"
  }


}));
const App = () => {

  const classes = useStyles();
  const [displayBackground, setBackground] = React.useState(false);
  const [theme, setTheme] = React.useState(null);
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  store.subscribe(() => {
    setBackground(store.getState().auth.isAuthenticated);
    setTheme(store.getState().ui.theme);

  })

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className={classes.back} style={{ backgroundImage: displayBackground && window.location.pathname == "/dashboard" ? `url(${theme})` : null, }}>
            <Navbar />

            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routes} />
              <Route component={NotFound} />
            </Switch>
          </div>


        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
