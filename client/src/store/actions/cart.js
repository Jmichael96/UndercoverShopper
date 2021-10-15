import * as types from './types/cart';
import axios from 'axios';
import { setAlert } from './alert';
import Constants from '../../utils/Constants';

//! Create a cart
export const createCart = (formData) => async (dispatch) => {
    await dispatch({ type: types.CREATE_CART_PENDING });
    await dispatch(createCartReq({ ...formData }));
};

export const createCartReq = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await axios.post(`${Constants.PROD_URL}/api/cart/create`, formData, config)
    .then(async (res) => {
        await dispatch({
            type: types.CREATE_CART_SUCCESS,
            payload: res.data.cart,
        });
        await dispatch(setAlert(res.data.serverMsg, 'success'));
    }).catch(async (err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            await dispatch(setAlert(error, 'error'));
        }
        await dispatch({
            type: types.CREATE_CART_FAIL
        });
    });
};

//! Fetch all 
export const fetchAll = (dayId) => async (dispatch) => {
    await dispatch({ type: types.FETCH_ALL_PENDING });
    await dispatch(fetchAllReq(dayId));
};

export const fetchAllReq = (dayId) => async (dispatch) => {
    await axios.get(`${Constants.PROD_URL}/api/cart/fetch_all/${dayId}`)
    .then(async (res) => {
        await dispatch({
            type: types.FETCH_ALL_SUCCESS,
            payload: res.data.items
        });
    }).catch(async (err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            await dispatch(setAlert(error, 'error'));
        }
        await dispatch({
            type: types.FETCH_ALL_FAIL
        });
    });
};

//! Mark complete
export const markComplete = (dayId, cartId) => async (dispatch) => {
    await dispatch({ type: types.MARK_COMPLETE_PENDING });
    await dispatch(markCompleteReq(dayId, cartId));
};

export const markCompleteReq = (dayId, cartId) => async (dispatch) => {
    await axios.put(`${Constants.PROD_URL}/api/cart/mark_complete/${dayId}/${cartId}`)
    .then(async (res) => {
        console.log(res.data);
        await dispatch({
            type: types.MARK_COMPLETE_SUCCESS,
            payload: {
                item: res.data.item,
                _id: cartId
            }
        });
        await dispatch(setAlert(res.data.serverMsg, 'success'));
    }).catch(async (err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            await dispatch(setAlert(error, 'error'));
        }
        await dispatch({
            type: types.MARK_COMPLETE_FAIL
        });
    });
};

//! Mark un-complete
export const markUnComplete = (dayId, cartId) => async (dispatch) => {
    await dispatch({ type: types.MARK_UNCOMPLETE_PENDING });
    await dispatch(markUnCompleteReq(dayId, cartId));
};

export const markUnCompleteReq = (dayId, cartId) => async (dispatch) => {
    await axios.put(`${Constants.PROD_URL}/api/cart/mark_uncomplete/${dayId}/${cartId}`)
    .then(async (res) => {
        await dispatch({
            type: types.MARK_UNCOMPLETE_SUCCESS,
            payload: {
                item: res.data.item,
                _id: cartId
            }
        });
        await dispatch(setAlert(res.data.serverMsg, 'success'));
    }).catch(async (err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            await dispatch(setAlert(error, 'error'));
        }
        await dispatch({
            type: types.MARK_UNCOMPLETE_FAIL
        });
    });
};

//! Delete an item
export const deleteItem = (dayId, cartId) => async (dispatch) => {
    await dispatch({ type: types.DELETE_PENDING });
    await dispatch(deleteItemReq(dayId, cartId));
};

export const deleteItemReq = (dayId, cartId) => async (dispatch) => {
    await axios.delete(`${Constants.PROD_URL}/api/cart/delete/${dayId}/${cartId}`)
    .then(async (res) => {
        await dispatch({
            type: types.DELETE_SUCCESS,
            payload: {
                item: res.data.item,
                _id: cartId
            }
        });
        await dispatch(setAlert(res.data.serverMsg, 'success'));
    }).catch(async (err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            await dispatch(setAlert(error, 'error'));
        }
        await dispatch({
            type: types.DELETE_FAIL
        });
    });
};