import { v4 as uuidv4 } from 'uuid';
import * as types from './types/alert';

export const setAlert = (msg, alertType, timeout = 4000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: types.SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: types.REMOVE_ALERT, payload: id }), timeout);
};

export const removeAlert = (id) => (dispatch) => {
    dispatch({
        type: types.REMOVE_ALERT,
        payload: id
    });
};