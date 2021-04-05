import {
    SET_THEME
} from '../actions/types';

const initialState = {
    theme: null,
};

function testReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_THEME:
            return {
                ...state,
                theme: payload
            };

        default:
            return state;
    }
}

export default testReducer;
