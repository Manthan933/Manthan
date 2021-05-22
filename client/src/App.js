import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import NotFound from './components/layout/NotFound';
import { LOGOUT } from './actions/types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { status } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import ThemeDialog from './components/themes/Theme';

const useStyles = makeStyles(() => ({
  back: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    minHeight: '100vh'
  },
  editTheme: {
    color: 'white',
    background: 'black',
    borderRadius: '50%',
    fontSize: '20px',
    position: 'fixed',
    right: 20,
    bottom: 150,
    cursor: 'pointer',
    padding: '10px',
    transition: '0.1s all',
    '&:hover': {
      background: 'white',
      padding: '10px',
      color: 'black',
      borderRadius: '50%'
    }
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
  const [displayBackground, setBackground] = React.useState(false);
  const [theme, setTheme] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
  store.subscribe(() => {
    setBackground(store.getState().auth.isAuthenticated);
    setTheme(store.getState().ui.theme);
  });

  const getTheme =
    window.location.pathname === '/dashboard' || window.location.pathname.startsWith('/class/');

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div
            className={classes.back}
            style={{
              backgroundImage: displayBackground && getTheme ? `url(${theme})` : null
            }}
          >
            <Navbar />

            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routes} />
              <Route component={NotFound} />
            </Switch>
            {getTheme ? (
              <Tooltip title="Change Theme">
                <CreateIcon onClick={handleClickOpen} className={classes.editTheme} />
              </Tooltip>
            ) : null}

            <ThemeDialog open={open} handleClose={handleClose} />
            <div className={classes.footer}>
              <p className={classes.footerp}>
                All rights reserved. Copyright ©{' '}
                <Link className={classes.link} to="/">
                  Manthan
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </p>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
