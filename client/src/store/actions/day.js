import * as types from './types/day';
import axios from 'axios';
import { setAlert } from './alert';
import { isEmpty } from 'jvh-is-empty';
import Constants from '../../utils/Constants';

//! Create
export const createDay = (day) => async (dispatch) => {
    await dispatch({ type: types.CREATE_DAY_PENDING });
    await dispatch(createDayReq(day));
};

export const createDayReq = (day) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await axios.post(`${Constants.PROD_URL}/api/day/create`, { day }, config)
        .then(async (res) => {
            await dispatch({
                type: types.CREATE_DAY_SUCCESS,
                payload: res.data.day
            });
            await dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.CREATE_DAY_FAIL
            });
        });
};

//! Fetch all 
export const fetchAllDays = () => async (dispatch) => {
    await dispatch({ type: types.FETCH_DAYS_PENDING });
    await dispatch(fetchAllDaysReq());
};

export const fetchAllDaysReq = () => async (dispatch) => {
    await axios.get(`${Constants.PROD_URL}/api/day/all`)
        .then(async (res) => {
            await dispatch({
                type: types.FETCH_DAYS_SUCCESS,
                payload: res.data.days
            });
        }).catch(async (err) => {
            await dispatch({
                type: types.FETCH_DAYS_FAIL
            });
        });
};

//! Delete a day
export const deleteDay = (id) => async (dispatch) => {
    await dispatch({ type: types.DELETE_DAY_PENDING });
    await dispatch(deleteDayReq(id));
};

export const deleteDayReq = (id) => async (dispatch) => {
    await axios.delete(`${Constants.PROD_URL}/api/day/delete/${id}`)
        .then(async (res) => {
            await dispatch({
                type: types.DELETE_DAY_SUCCESS,
                payload: id
            });
            await dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch(async (err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                await dispatch(setAlert(error, 'error'));
            }
            await dispatch({
                type: types.DELETE_DAY_FAIL
            });
        });
};

//! Set day 
export const setDay = (day) => async (dispatch) => {
    await dispatch({ type: types.SET_DAY_PENDING });
    await dispatch(setDayReq(day));
};

export const setDayReq = (day) => async (dispatch) => {
    if (isEmpty(day)) {
        return await dispatch({ type: types.SET_DAY_FAIL });
    }
    await dispatch({
        type: types.SET_DAY_SUCCESS,
        payload: { ...day }
    });
};