import * as types from "../types/taskTypes";

const initialState = {
    taskdata: [],
    error: '',
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.TASK_LOADING:
            return { ...state, isLoading: true };
        case types.SET_TASK:
            return {
                ...state,
                taskdata: action.payload,
                isLoading: false,
                error: ''
            };
        case types.SET_TASK_ERRORS:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case types.CLEAR_TASK_ERRORS:
            return {
                ...state,
                error: ''
            };
        default:
            return state;
    }
}
