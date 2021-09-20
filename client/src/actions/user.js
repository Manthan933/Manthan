import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CREATE_CLASS,
  JOIN_CLASS,
  LEAVE_CLASS,
  CLASSES_LOADED,
  USER_ERROR,
  AUTH_RESET
} from './actionTypes';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const settings = {
  position: 'bottom-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

// Get current user classes
export const getClasses = () => async (dispatch) => {
  dispatch({
    type: AUTH_RESET
  });
  try {
    const res = await axios.get('/classrooms/', config);
    dispatch({
      type: CLASSES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Create new class
export const createClass = (formData) => async (dispatch) => {
  dispatch({
    type: AUTH_RESET
  });
  try {
    const res = await axios.post('/api/classrooms/', formData, config);
    toast.success('Class Created !', settings);
    dispatch({
      type: CREATE_CLASS,
      payload: res.data
    });
  } catch (err) {
    toast.error(err.response.statusText, settings);
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Leave current class
export const leaveClass = (code) => async (dispatch) => {
  dispatch({
    type: AUTH_RESET
  });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    await axios.delete(`/api/classrooms/${code}`, config);
    toast.success('Class Removed !', settings);
    dispatch({
      type: LEAVE_CLASS,
      payload: code
    });
  } catch (err) {
    toast.error(err.response.statusText, settings);
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Join new class
export const joinClass = (code, history) => async (dispatch) => {
  dispatch({
    type: AUTH_RESET
  });
  try {
    const res = await axios.post(`/api/classrooms/${code}`, config);
    toast.success('Class Added !', settings);

    dispatch({
      type: JOIN_CLASS,
      payload: res.data
    });
    if (history) {
      history.push('/dashboard');
    }
  } catch (err) {
    toast.error(err.response.statusText, settings);
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
