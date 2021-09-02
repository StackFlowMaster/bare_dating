import axios from "axios";

import {
    PROFILE_LOADING,
    AUTHENTICATED,
    SET_AUTH_ERRORS,
    CLEAR_AUTH_ERRORS,
    LOGOUT
} from "../types/authTypes";
import setAuthToken from "../../utils/setAuthToken";
import { API_URL } from "../../utils/service";

const baseURL = API_URL;

export const signup = (request) => (dispatch) => {
    dispatch({ type: PROFILE_LOADING });
    axios
        .post(baseURL + "/signup.php", request)
        .then((res) => {
            const data = res.data;
            if(data.success) {
                login(request)(dispatch);
            } else {
                dispatch({
                    type: SET_AUTH_ERRORS,
                    payload: data.message,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.message,
            });
        });
};

export const login = (request) => (dispatch) => {
    dispatch({ type: PROFILE_LOADING });

    axios
        .post(baseURL + "/login.php", request)
        .then((res) => {
            const data = res.data;
            if(data.success) {
                dispatch({
                    type: AUTHENTICATED,
                    payload: true,
                });
                setAuthToken(data.token);
            } else {
                dispatch({
                    type: SET_AUTH_ERRORS,
                    payload: data.message,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.message,
            });
        });
};

export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_AUTH_ERRORS,
        payload: '',
    });
}

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
        payload: '',
    });
}