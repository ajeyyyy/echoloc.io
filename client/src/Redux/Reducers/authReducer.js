import {REGISTER_SUCCESS, REGISTER_FAIL, 
    USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED} from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

const authReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: false,
                isAuthenticated: false
            }
        case USER_LOADED:
            return{
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        default:
            return state
    }
};

export default authReducer;
