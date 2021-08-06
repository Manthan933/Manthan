import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_CLASS, EDIT_CLASS, CLASS_ERROR, CLASS_RESET } from './actionTypes';

const config = { headers: { 'Content-Type': 'application/json' } };

const settings = {
  position: 'bottom-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};
// Get current class
export const getClass = (code) => async (dispatch) => {
  console.log('here');
  dispatch({ type: CLASS_RESET });
  try {
    const res = await axios.get(`/api/classrooms/${code}`, config);
    dispatch({ type: GET_CLASS, payload: res.data });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: CLASS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Edit current class
export const editClass = (code, data) => async (dispatch) => {
  dispatch({ type: CLASS_RESET });
  try {
    const res = await axios.patch(`/api/classrooms/${code}`, data, config);
    toast.success('Class Details Updated !', settings);
    dispatch({ type: EDIT_CLASS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
