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
import Scores from './pages/User';
import NotFound from './pages/Page404';
import Classroom from './pages/Classroom';
import JoinClass from './pages/JoinClass';
import CreateTest from './pages/CreateTest';
import Test from './pages/Test';
// ----------------------------------------------------------------------

const Github = () => {
  window.location.href = 'https://github.com/Manthan933/Manthan';
  return null;
};

function Router({ auth: { isAuthenticated, loading }, classroom }) {
  const Private = (children, navigate) => {
    if (loading === false && classroom.loading === false) {
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
      path: '/class',
      element: Private(<DashboardLayout />, <Navigate to="/login" />),
      children: [
        { path: '/score/*', element: <Scores /> },
        { path: '/*', element: <Classroom /> }
      ]
    },
    {
      path: '/test',
      element: Private(<DashboardLayout />, <Navigate to="/login" />),
      children: [
        { path: '/create/*', element: <CreateTest /> },
        { path: '/*', element: <Test /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: Private(<Navigate to="/dashboard" />, <Login />) },
        { path: 'join/*', element: Private(<JoinClass />, <Navigate to="/login" />) },
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
  auth: state.auth,
  classroom: state.classroom
});

export default connect(mapStateToProps)(Router);
