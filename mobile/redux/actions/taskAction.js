import axios from "axios";

import {
    TASK_LOADING,
    SET_TASK,
    SET_TASK_ERRORS,
    CLEAR_TASK_ERRORS
} from "../types/taskTypes";
import { API_URL } from "../../utils/service";

const baseURL = API_URL;

export const getAllTasks = () => (dispatch) => {
    dispatch({ type: TASK_LOADING });
    axios
        .post(baseURL + "/read.php")
        .then((res) => {
            const data = res.data;
            if(data.success) {
                dispatch({
                    type: SET_TASK,
                    payload: data.data.body,
                });
            } else {
                dispatch({
                    type: SET_TASK_ERRORS,
                    payload: data.message,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: SET_TASK_ERRORS,
                payload: err.message,
            });
        });
};

export const deleteTask = (request) => (dispatch) => {
    dispatch({ type: TASK_LOADING });

    axios
        .post(baseURL + "/delete.php", request)
        .then((res) => {
            const data = res.data;
            if(data.success) {
                getAllTasks()(dispatch);
            } else {
                dispatch({
                    type: SET_TASK_ERRORS,
                    payload: data.message,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: SET_TASK_ERRORS,
                payload: err.message,
            });
        });
};

export const createTask = (request) => (dispatch) => {
    dispatch({ type: TASK_LOADING });
    console.log('request : ', request)
    axios
        .post(baseURL + "/create.php", request)
        .then((res) => {
            const data = res.data;
            if(data.success) {
                getAllTasks()(dispatch);
            } else {
                dispatch({
                    type: SET_TASK_ERRORS,
                    payload: data.message,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: SET_TASK_ERRORS,
                payload: err.message,
            });
        });
}

export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_TASK_ERRORS,
        payload: '',
    });
}