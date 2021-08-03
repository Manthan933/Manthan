import axios from 'axios';
import { GET_CLASS, EDIT_CLASS, REMOVE_USER, CLASS_ERROR, CLASS_RESET } from './actionTypes';

const config = { headers: { 'Content-Type': 'application/json' } };
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
