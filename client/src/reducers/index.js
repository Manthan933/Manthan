import { combineReducers } from 'redux';
import auth from './auth';
import classroom from './classroom';

export default combineReducers({
  auth,
  classroom
});
