import * as types from '../actions/types/day';

const initialState = {
    days: [],
    day: null,
    hasFetchedAll: false,
    fetching: false,
    deleting: false,
    creating: false
};

const dayReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CREATE_DAY_FAIL:
        case types.FETCH_DAYS_FAIL:
            return {
                ...state,
                days: [],
                fetching: false,
                deleting: false,
                creating: false
            };
        case types.CREATE_DAY_PENDING:
            return {
                ...state,
                creating: true
            };
        case types.CREATE_DAY_SUCCESS:
            let mergedArr = [payload, ...state.days];
            return {
                ...state,
                days: mergedArr.sort((a, b) => {
                    return new Date(a.day) - new Date(b.day)
                }),
                creating: false
            };
        case types.FETCH_DAYS_PENDING:
            return {
                ...state,
                days: [],
                fetching: true
            };
        case types.FETCH_DAYS_SUCCESS:
            let fetchedMergedArr = [...payload, ...state.days];
            return {
                ...state,
                days: fetchedMergedArr.sort((a, b) => {
                    return new Date(a.day) - new Date(b.day)
                }),
                fetching: false,
                hasFetchedAll: true
            };
        case types.DELETE_DAY_FAIL:
            return {
                ...state,
                deleting: false
            };
        case types.DELETE_DAY_PENDING:
            return {
                ...state,
                deleting: true
            };
        case types.DELETE_DAY_SUCCESS:
            return {
                ...state,
                deleting: false,
                days: state.days.filter((a) => a._id !== payload)
            };
        case types.SET_DAY_FAIL:
            return {
                ...state,
                day: null,
                fetching: false
            };
        case types.SET_DAY_PENDING:
            return {
                ...state,
                day: [],
                fetching: true
            };
        case types.SET_DAY_SUCCESS:
            return {
                ...state,
                day: payload,
                fetching: false
            };
        default:
            return state;
    }
};
export default dayReducer;