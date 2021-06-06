import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import NotFound from './components/layout/NotFound';
import { LOGOUT } from './actions/types';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from './img/svg1.png';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { status } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

const useStyles = makeStyles(() => ({
  back: {
    minHeight: '100vh',
    background: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  footer: {
    position: 'absolute',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '35px',
    backgroundColor: 'rgba(0, 0, 0, 0.952)',
    bottom: ' 0px',
    left: 0,
    width: '100%',
    overflow: 'hidden'
  },

  footerp: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: '13px',
    opacity: '0.8'
  },
  link: {
    color: ' #fff'
  }
}));
const App = () => {
  const classes = useStyles();
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(status());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className={classes.back}>
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
