import * as types from '../actions/types/confirmModal';

const initialState = {
    isOpen: false,
    modalData: {
        modalText: '',
        modalAction: () => {}
    }
};

const confirmModalReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_MODAL:
            return {
                ...state,
                modalData: payload,
                isOpen: true
            };
        case types.CLOSE_MODAL:
            return initialState;
        default: return state;
    };
};

export default confirmModalReducer;