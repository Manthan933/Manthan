import { GET_CLASS, EDIT_CLASS, CLASS_ERROR, CLASS_RESET } from '../actions/actionTypes';

const initialState = {
  loading: false,
  currClass: null,
  tests: []
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
