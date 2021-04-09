import {
  GET_CLASSROOMS,
  GET_CLASSROOM,
  GET_USERS,
  REMOVE_USERS,
  JOIN_CLASSROOM,
  CREATE_CLASSROOM,
  UPDATE_CLASSROOM,
  LEAVE_CLASSROOM,
  CLASSROOM_ERROR
} from '../actions/types';

const initialState = {
  classroom: null,
  classrooms: [],
  users: [],
  loading: true,
  error: null
};

function classroomReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLASSROOM:
    case UPDATE_CLASSROOM:
      return {
        ...state,
        classroom: payload,
        loading: false
      };
    case GET_CLASSROOMS:
      return {
        ...state,
        classrooms: payload,
        loading: false
      };
    case JOIN_CLASSROOM:
    case CREATE_CLASSROOM:
      return {
        ...state,
        classrooms: [...state.classrooms, payload],
        loading: false
      };

    case LEAVE_CLASSROOM:
      return {
        ...state,
        classrooms: state.classrooms.filter(
          (classroom) => classroom.code !== payload
        ),
        loading: false
      };
    case CLASSROOM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        classroom: null
      };
    case GET_USERS:
    case REMOVE_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default classroomReducer;
