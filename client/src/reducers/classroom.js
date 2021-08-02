import jwtDecode from 'jwt-decode';
import {
  GET_CLASS,
  EDIT_CLASS,
  CLASSES_LOADED,
  REMOVE_USER,
  CLASS_ERROR,
  CLASS_RESET
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  classroom: null,
  users: []
};

// switch case block and then returning data acc to the action type
export default function ClassReducer(state = initialState, action) {
  switch (action.type) {
    case CLASS_ERROR: {
      return {
        ...state,
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
    case CLASS_RESET: {
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
