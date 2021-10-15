import * as types from '../actions/types/cart';

const initialState = {
    items: [],
    completedItems: [],
    item: null,
    fetching: false,
    deleting: false,
    creating: false,
    updating: false
};

const cartReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CREATE_CART_FAIL:
            return {
                ...state,
                creating: false
            };
        case types.CREATE_CART_PENDING:
            return {
                ...state,
                creating: true
            };
        case types.CREATE_CART_SUCCESS:
            return {
                ...state,
                creating: false,
                items: [payload, ...state.items]
            };
        case types.FETCH_ALL_FAIL:
            return {
                ...state,
                fetching: false,
                items: [],
                completedItems: []
            };
        case types.FETCH_ALL_PENDING:
            return {
                ...state,
                fetching: true
            };
        case types.FETCH_ALL_SUCCESS:
            let filteredItems = payload.filter((a) => a.isChecked !== true);
            let filteredCompleteItems = payload.filter((a) => a.isChecked !== false);
            return {
                ...state,
                fetching: false,
                items: [...filteredItems, ...state.items],
                completedItems: [...filteredCompleteItems, ...state.completedItems]
            };
        case types.MARK_COMPLETE_FAIL:
        case types.MARK_UNCOMPLETE_FAIL:
            return {
                ...state,
                updating: false
            };
        case types.MARK_COMPLETE_PENDING:
        case types.MARK_UNCOMPLETE_PENDING:
            return {
                ...state,
                updating: true
            };
        case types.MARK_COMPLETE_SUCCESS:
            return {
                ...state,
                updating: false,
                items: state.items.filter((a) => a._id !== payload._id),
                completedItems: [payload.item, ...state.completedItems]
            };
        case types.MARK_UNCOMPLETE_SUCCESS:
            return {
                ...state,
                items: [payload.item, ...state.items],
                completedItems: state.completedItems.filter((a) => a._id !== payload._id)
            };
        case types.DELETE_FAIL:
            return {
                ...state,
                deleting: false
            };
        case types.DELETE_PENDING:
            return {
                ...state,
                deleting: true
            };
        case types.DELETE_SUCCESS:
            return {
                ...state,
                deleting: false,
                items: state.items.filter((a) => a._id !== payload._id),
                completedItems: state.completedItems.filter((a) => a._id !== payload._id)
            }
        default:
            return state;
    }
};

export default cartReducer;