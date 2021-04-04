import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import classroom from './classroom';
import test from './test';
import ui from "./ui";
export default combineReducers({
  alert,
  auth,
  classroom,
  test,
  ui
});
