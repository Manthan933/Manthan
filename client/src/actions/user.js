import axios from 'axios';

import {
  CREATE_CLASS,
  JOIN_CLASS,
  LEAVE_CLASS,
  CLASSES_LOADED,
  AUTH_ERROR,
  AUTH_RESET
} from './actionTypes';

const config = { headers: { 'Content-Type': 'application/json' } };

// Get current user classes
export const getClasses = () => async (dispatch) => {
  dispatch({ type: AUTH_RESET });
  try {
    const res = await axios.get('/classrooms/', config);
    dispatch({ type: CLASSES_LOADED, payload: res.data });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create new class
export const createClass = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_RESET });
  try {
    const res = await axios.post('/api/classrooms/', formData, config);
    dispatch({ type: CREATE_CLASS, payload: res.data });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Leave current class
export const leaveClass =
  (code, history, redirect = false) =>
  async (dispatch) => {
    dispatch({ type: AUTH_RESET });
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      await axios.delete(`/api/classrooms/${code}`, config);
      dispatch({ type: LEAVE_CLASS, payload: code });
      if (redirect) {
        history.push('/dashboard');
      }
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Join new class
export const joinClass = (code, history) => async (dispatch) => {
  dispatch({ type: AUTH_RESET });
  try {
    const res = await axios.post(`/api/classrooms/${code}`, config);
    dispatch({ type: JOIN_CLASS, payload: res.data });
    if (history) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
