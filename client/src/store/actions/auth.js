import * as types from './types/auth';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';
import Constants from '../../utils/Constants';

//! Register
export const register = (formData, history) => async (dispatch) => {
    await dispatch({ type: types.REGISTER_PENDING });
    await dispatch(registerReq({ ...formData }, history));
};

export const registerReq = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    await axios.post(`${Constants.PROD_URL}/api/auth/register`, formData, config)
        .then(async (res) => {
            console.log(res.data);
            await dispatch({
                type: types.REGISTER_SUCCESS,
                payload: res.data.token
            });
            await dispatch(loadUser());
            await dispatch(setAlert(res.data.serverMsg, 'success'));
            await history.push('/home')
        }).catch((err) => {
            const error = err.response.data.serverMsg;
            console.log(err);
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.REGISTER_FAIL
            });
        });
};

//! Login
export const login = (formData, history) => async (dispatch) => {
    await dispatch({ type: types.LOGIN_PENDING });
    await dispatch(loginReq({ ...formData }, history));
};

export const loginReq = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    await axios.post(`${Constants.PROD_URL}/api/auth/login`, formData, config)
        .then(async (res) => {
            await dispatch({
                type: types.LOGIN_SUCCESS,
                payload: res.data.token
            });
            await dispatch(loadUser());
            await dispatch(setAlert(res.data.serverMsg, 'success'));
            await history.push('/home');
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            console.log(err);
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.LOGIN_FAIL
            });
        });
};

//! Load user
export const loadUser = () => async (dispatch) => {
    await dispatch({ type: types.LOAD_USER_PENDING });
    await dispatch(loadUserReq());
};

export const loadUserReq = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    axios.get(`${Constants.PROD_URL}/api/auth/load_user`)
        .then(async (res) => {
            await dispatch({
                type: types.LOAD_USER_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.LOAD_USER_FAIL
            });
        });
};

//! Logout
export const logout = (history) => async (dispatch) => {
    await dispatch({ type: types.LOGOUT_PENDING });
    await dispatch(logoutReq(history));
};

export const logoutReq = (history) => async (dispatch) => {
    await axios.put(`${Constants.PROD_URL}/api/auth/logout`)
        .then(async (res) => {
            await dispatch({ type: types.LOGOUT_SUCCESS });
            await dispatch(setAlert(res.data.serverMsg, 'success'));
            await history.push('/');
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            console.log(err);
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.LOGIN_FAIL
            });
        });
};
