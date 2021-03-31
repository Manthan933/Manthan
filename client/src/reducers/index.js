import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import classroom from './classroom';
import test from './test';

export default combineReducers({
  alert,
  auth,
  classroom,
  test
});
