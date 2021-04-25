import api from '../utils/api';
import { setAlert } from './alert';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_THEME,
  REQUEST_AUTH
} from './types';

// Load User when we require user data
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({type: REQUEST_AUTH})
    const res = await api.get('/auth');
    dispatch({ type: SET_THEME, payload: res.data.theme });
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// we will not send API request for check user status , just check the browser cookie
export const status = () => (dispatch) => {
  try {
    // decode the token
    const tokenData = jwtDecode(Cookie.get('token'));
    const currentTime = Date.now();
    const tokenExpireTime = new Date(0).setUTCSeconds(tokenData.exp);

    // store the current theme in localstorage
    localStorage.setItem('theme', localStorage.getItem('theme'));
    dispatch({ type: SET_THEME, payload: localStorage.getItem('theme') });

    // check whethere token is expire or not
    if (currentTime > tokenExpireTime) {
      Cookie.remove('token');
      dispatch({
        type: LOGOUT
      });
    } else {
      dispatch({
        type: USER_LOADED,
        payload: tokenData.user
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
// Register User
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({type: REQUEST_AUTH})
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    dispatch({type: REQUEST_AUTH})
    const res = await api.post('/auth', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    // Add theme to localstorage
    localStorage.setItem('theme', res.data.theme);
    dispatch({ type: SET_THEME, payload: localStorage.getItem('theme') });

    // set Cookie in browser
    Cookie.set('token', res.data.token);

    window.location.href = '/dashboard';
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Logout with remove cookie from browserr
export const logout = () => (dispatch) => {
  Cookie.remove('token');
  dispatch({
    type: LOGOUT
  });
};
