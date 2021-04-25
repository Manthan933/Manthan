import api from '../utils/api';
import { SET_THEME } from './types';
import { setAlert } from './alert';
export const saveTheme = (theme) => async (dispatch) => {
  try {
    const res = await api.post('/users/theme/', { theme });
    localStorage.setItem('theme', theme);
    dispatch({ type: SET_THEME, payload: theme });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (e) {
    dispatch(setAlert('no theme update', 'danger'));
  }
};
