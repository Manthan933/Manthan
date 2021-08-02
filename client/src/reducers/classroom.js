import jwtDecode from 'jwt-decode';
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
  RESET
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  classroom: null,
  classes: [],
  users: []
};

// switch case block and then returning data acc to the action type
export default function ClassReducer(state = initialState, action) {
  switch (action.type) {
    case CLASS_ERROR: {
      return {
        ...state,
        class: [],
        classroom: null,
        users: [],
        loading: false
      };
    }
    case CLASSES_LOADED: {
      return {
        ...state,
        classes: action.payload,
        loading: false
      };
    }

    case CREATE_CLASS: {
      return {
        ...state,
        classes: action.payload,
        loading: false
      };
    }
    case RESET: {
      return {
        ...state,
        loading: true
      };
    }
    default: {
      return state;
    }
  }
}
