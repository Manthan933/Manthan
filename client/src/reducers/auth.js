import jwtDecode from 'jwt-decode';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGOUT,
  GOOGLEAUTH,
  AUTH_RESET,
  CREATE_CLASS,
  JOIN_CLASS,
  LEAVE_CLASS,
  USER_ERROR
} from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  classes: [],
  user: null
};

// switch case block and then returning data acc to the action type
export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      const decoded = jwtDecode(action.payload.token);
      localStorage.setItem('userDet', JSON.stringify(decoded));
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: true
      };
    }
    case GOOGLEAUTH: {
      return state;
    }
    case USER_ERROR:
      return {
        ...state,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT: {
      localStorage.removeItem('userDet');
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        classes: action.payload.classes,
        loading: false
      };
    }
    case CREATE_CLASS:
    case JOIN_CLASS: {
      return {
        ...state,
        classes: [...state.classes, action.payload],
        loading: false
      };
    }
    case LEAVE_CLASS: {
      return {
        ...state,
        classes: state.classes.filter((classroom) => classroom.code !== action.payload),
        loading: false
      };
    }

    case AUTH_RESET: {
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
