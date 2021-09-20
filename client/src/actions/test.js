import { toast } from 'react-toastify';
import axios from 'axios';
import { GET_TEST, SUBMIT_TEST, CLASS_ERROR, CLASS_RESET } from './actionTypes';

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

// Start Current Test
export const getTest = (id) => async (dispatch) => {
  dispatch({
    type: CLASS_RESET
  });
  try {
    const res = await axios.get(`/api/tests/id/${id}`, config);
    dispatch({
      type: GET_TEST,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      toast.error(errors.msg, settings);
    }
    dispatch({
      type: CLASS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Start Current Test
export const startTest = (id) => async (dispatch) => {
  dispatch({
    type: CLASS_RESET
  });
  try {
    const res = await axios.get(`/api/tests/start/${id}`);
    dispatch({
      type: GET_TEST,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response);
    if (errors) {
      toast.error(errors.msg, settings);
    }
    dispatch({
      type: CLASS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Submit current test
export const submitTest = (id, response) => async (dispatch) => {
  dispatch({
    type: CLASS_RESET
  });
  try {
    await axios.post(`/api/tests/id/${id}`, response, config);
    toast.success('Test submitted sucessfully.', settings);
    dispatch({
      type: SUBMIT_TEST
    });
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response);
    if (errors) {
      toast.error(errors.msg, settings);
    }
    dispatch({
      type: CLASS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
