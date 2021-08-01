import { Navigate, useRoutes } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

const Github = () => {
  window.location.href = 'https://github.com/Manthan933/Manthan';
  return null;
};

function Router({ auth: { isAuthenticated, loading } }) {
  const Private = (children, navigate) => {
    if (loading === false) {
      if (isAuthenticated) return children;

      return navigate;
    }
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
  return useRoutes([
    {
      path: '/dashboard',
      element: Private(<DashboardLayout />, <Navigate to="/login" />),
      children: [{ path: '/', element: <Dashboard /> }]
    },
    {
      path: '/classroom',
      element: Private(<DashboardLayout />, <Navigate to="/login" />),
      children: [{ path: '/:code', element: <User /> }]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: Private(<Navigate to="/dashboard" />, <Login />) },
        { path: 'register', element: Private(<Navigate to="/dashboard" />, <Register />) },
        { path: '404', element: <NotFound /> },
        { path: 'github', element: <Github /> },
        {
          path: '/',
          element: <Navigate to="/login" />
        },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

Router.prototype = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Router);
