import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from '../actions/actionTypes';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

const profileReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                user: null,
                loading: false
            }
        default:
            return state
    }
}

export default profileReducer