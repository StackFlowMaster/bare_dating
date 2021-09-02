import * as types from "../types/authTypes";

const initialState = {
    isAuthenticated: false,
    userdata: {},
    error: '',
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.PROFILE_LOADING:
            return { ...state, isLoading: true };
        case types.AUTHENTICATED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                error: ''
            };
        case types.CLEAR_AUTH_ERRORS:
            return {
                ...state,
                error: ''
            };
        case types.SET_AUTH_ERRORS:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}
