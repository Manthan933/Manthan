import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_CLASSROOM,
  GET_CLASSROOMS,
  UPDATE_CLASSROOM,
  CLASSROOM_ERROR,
  GET_USERS,
  REMOVE_USERS,
  CREATE_CLASSROOM,
  JOIN_CLASSROOM,
  LEAVE_CLASSROOM
} from './types';

// Get current user classes
export const getClasses = () => async (dispatch) => {
  try {
    const res = await api.get('/classrooms/');
    dispatch({
      type: GET_CLASSROOMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create new class
export const CreateClass = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/classrooms/', formData);
    dispatch(setAlert('Class created sucessfully.', 'danger'));
    dispatch({
      type: CREATE_CLASSROOM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Leave current class
export const LeaveClass = (code, history, redirect = false) => async (
  dispatch
) => {
  try {
    await api.delete(`/classrooms/${code}`);
    dispatch(setAlert('Class sucessfully removed.', 'danger'));
    dispatch({
      type: LEAVE_CLASSROOM,
      payload: code
    });
    if (redirect) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response);
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit current class
export const editClass = (code, config) => async (dispatch) => {
  try {
    const res = await api.patch(`/classrooms/${code}`, config);
    dispatch(setAlert('Class details updated.', 'danger'));
    dispatch({
      type: UPDATE_CLASSROOM,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response);
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Join new class
export const JoinClass = (code, history) => async (dispatch) => {
  try {
    const res = await api.post(`/classrooms/${code}`);
    dispatch(setAlert('Class sucessfully joined.', 'danger'));
    dispatch({
      type: JOIN_CLASSROOM,
      payload: res.data
    });
    if (history) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response);
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    if (history) {
      history.push('/dashboard');
    }
  }
};

// Get current class
export const getClass = (code) => async (dispatch) => {
  try {
    const res = await api.get(`/classrooms/${code}`);
    dispatch({
      type: GET_CLASSROOM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get current class users
export const getUsers = (code) => async (dispatch) => {
  try {
    const res = await api.get(`/classrooms/${code}/users`);
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CLASSROOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete current class users
export const removeUser = (code, user) => async (dispatch) => {
  try {
    await api.delete(`/classrooms/${code}/${user._id}`);
    const res = await api.get(`/classrooms/${code}/users`);
    dispatch(setAlert(`${user.email} sucessfully removed.`, 'danger'));
    dispatch({
      type: REMOVE_USERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
