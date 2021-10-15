import * as types from './types/confirmModal';

export const setModal = (modalText, modalAction) => async (dispatch) => {
    await dispatch({
        type: types.SET_MODAL,
        payload: {
            modalText,
            modalAction
        }
    });
};

export const closeModal = () => async (dispatch) => {
    dispatch({ type: types.CLOSE_MODAL });
};