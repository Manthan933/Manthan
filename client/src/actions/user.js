import axios from 'axios';

import {
  GET_CLASS,
  CREATE_CLASS,
  JOIN_CLASS,
  DELETE_CLASS,
  LEAVE_CLASS,
  EDIT_CLASS,
  CLASSES_LOADED,
  REMOVE_USER,
  CLASS_ERROR,
  CLASS_RESET,
  AUTH_RESET
} from './actionTypes';

// Get current user classes
export const getClasses = () => async (dispatch) => {
  dispatch({ type: AUTH_RESET });
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const res = await axios.get('/classrooms/', config);
    dispatch({ type: CLASSES_LOADED, payload: res.data });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create new class
export const createClass = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_RESET });
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const res = await axios.post('/api/classrooms/', formData, config);
    dispatch({ type: CREATE_CLASS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Leave current class
// export const LeaveClass =
//   (code, history, redirect = false) =>
//   async (dispatch) => {
//     dispatch({ type: CLASS_RESET });
//     try {
//       await axios.delete(`/classrooms/${code}`);
//       dispatch({ type: LEAVE_CLASS, payload: code });
//       if (redirect) {
//         history.push('/dashboard');
//       }
//     } catch (err) {
//       dispatch({
//         type: CLASS_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status }
//       });
//     }
//   };
//
// // Edit current class
// export const editClass = (code, config) => async (dispatch) => {
//   dispatch({ type: CLASS_RESET });
//   try {
//     const res = await axios.patch(`/classrooms/${code}`, config);
//     dispatch(setAlert('Class details updated.', 'danger'));
//     dispatch({ type: EDIT_CLASS, payload: res.data });
//   } catch (err) {
//     dispatch({
//       type: CLASS_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
//
// // Join new class
// export const JoinClass = (code, history) => async (dispatch) => {
//   try {
//     const res = await axios.post(`/classrooms/${code}`);
//     dispatch(setAlert('Class sucessfully joined.', 'danger'));
//     dispatch({ type: JOIN_CLASS, payload: res.data });
//     if (history) {
//       history.push('/dashboard');
//     }
//   } catch (err) {
//     dispatch({
//       type: CLASS_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
//
// // Get current class
// export const getClass = (code) => async (dispatch) => {
//   dispatch({ type: CLASS_RESET });
//   try {
//     const res = await axios.get(`/classrooms/${code}`);
//     dispatch({ type: GET_CLASS, payload: res.data });
//   } catch (err) {
//     if (err.response) {
//       dispatch({
//         type: CLASS_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status }
//       });
//     }
//   }
// };
//
// Get current class users
// export const getUsers = (code) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/classrooms/${code}/users`);
//     dispatch({
//       type: GET_USERS,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: CLASS_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Delete current class users
// export const removeUser = (code, user) => async (dispatch) => {
//   try {
//     await axios.delete(`/classrooms/${code}/${user._id}`);
//     const res = await axios.get(`/classrooms/${code}/users`);
//     dispatch(setAlert(`${user.email} sucessfully removed.`, 'danger'));
//     dispatch({
//       type: REMOVE_USERS,
//       payload: res.data
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
