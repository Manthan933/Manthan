import {
  GET_CLASS,
  EDIT_CLASS,
  CLASS_ERROR,
  CLASS_RESET,
  GET_TESTS,
  CREATE_TEST,
  DELETE_TEST,
  GET_TEST,
  SUBMIT_TEST,
  GET_USER
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  currClass: null,
  currTest: null,
  tests: [],
  users: []
};

// switch case block and then returning data acc to the action type
export default function ClassReducer(state = initialState, action) {
  switch (action.type) {
    case CLASS_ERROR: {
      return {
        ...state,
        currClass: null,
        loading: false
      };
    }
    case GET_USER:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_TESTS:
      return {
        ...state,
        tests: action.payload,
        loading: false
      };
    case GET_TEST:
      return {
        ...state,
        currTest: action.payload,
        loading: false
      };
    case SUBMIT_TEST:
      return {
        ...state,
        test: null,
        loading: false
      };
    case CREATE_TEST: {
      return {
        ...state,
        tests: [...state.tests, action.payload],
        loading: false
      };
    }
    case DELETE_TEST: {
      return {
        ...state,
        tests: state.tests.filter((test) => test._id !== action.payload),
        loading: false
      };
    }
    case GET_CLASS:
    case EDIT_CLASS: {
      return {
        ...state,
        currClass: action.payload,
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
