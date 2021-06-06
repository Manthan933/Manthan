import {
  GET_TESTS,
  GET_TEST,
  CREATE_TEST,
  TEST_ERROR,
  SUBMIT_TEST,
  DELETE_TEST,
  GET_SCORES
} from '../actions/types';

const initialState = {
  tests: [],
  test: null,
  loading: true,
  error: {}
};

function testReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TESTS:
      return {
        ...state,
        tests: payload,
        loading: false
      };
    case CREATE_TEST:
      return {
        ...state,
        loading: false
      };
    case GET_TEST:
      return {
        ...state,
        test: payload,
        loading: false
      };
    case GET_SCORES:
      return {
        ...state,
        test: payload,
        loading: false
      };
    case TEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case SUBMIT_TEST:
      return {
        ...state,
        test: null,
        loading: false
      };

    case DELETE_TEST:
      return {
        ...state,
        tests: state.tests.filter((test) => test._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}

export default testReducer;
