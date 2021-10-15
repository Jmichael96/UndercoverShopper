import * as types from '../actions/types/auth';

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: null,
    user: null,
    authLoading: false,
    loggingOut: false,
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.LOGIN_FAIL:
        case types.LOAD_USER_FAIL:
        case types.LOGOUT_SUCCESS:
        case types.LOGOUT_FAIL:
        case types.REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuth: null,
                authLoading: false,
                loggingOut: false
            };
        case types.LOGIN_PENDING:
        case types.LOAD_USER_PENDING:
        case types.REGISTER_PENDING:
            return {
                ...state,
                isAuth: null,
                user: null,
                authLoading: true,
            };
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS:
            localStorage.setItem('token', payload);
            return {
                ...state,
                authLoading: false,
                isAuth: true,
                token: payload
            };
        case types.LOAD_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                authLoading: false,
                user: payload
            };
        case types.LOGOUT_PENDING:
            return {
                ...state,
                loggingOut: true
            };
        default: return state;
    };
};

export default authReducer;