import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_TESTS,
  GET_TEST,
  CREATE_TEST,
  SUBMIT_TEST,
  DELETE_TEST,
  TEST_ERROR
} from './types';

// Get tests
export const getTests = (code) => async (dispatch) => {
  try {
    const res = await api.get(`/tests/${code}`);
    dispatch({
      type: GET_TESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create test
export const createTest = (code, history, test) => async (dispatch) => {
  try {
    await api.post(`/tests`, test);
    dispatch(setAlert('Test created sucessfully.', 'danger'));
    dispatch({
      type: CREATE_TEST
    });
    history.push(`/class/${code}`);
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response);
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({
      type: TEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Start Current Test
export const startTest = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/tests/id/${id}`);
    dispatch({
      type: GET_TEST,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response);
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({
      type: TEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Submit current test
export const submitTest = (id, history, response) => async (dispatch) => {
  try {
    await api.post(`/tests/id/${id}`, response);
    dispatch(setAlert('Test submitted sucessfully.', 'danger'));
    history.push('/dashboard');
    dispatch({
      type: SUBMIT_TEST
    });
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response);
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({
      type: TEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete current test
export const deleteTest = (id) => async (dispatch) => {
  try {
    await api.delete(`/tests/id/${id}`);
    dispatch(setAlert('Test Deleted.', 'danger'));
    dispatch({
      type: DELETE_TEST,
      payload: id
    });
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response);
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({
      type: TEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
