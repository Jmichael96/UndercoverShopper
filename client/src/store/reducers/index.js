import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import day from './day';
import cart from './cart';
import confirmModal from './confirmModal';
const rootReducer = combineReducers({
    alert,
    auth,
    day,
    cart,
    confirmModal
});

export default rootReducer;