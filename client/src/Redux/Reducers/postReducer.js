import {GET_POST, POST_ERROR, UPDATE_LIKES, ADD_COMMENT, REMOVE_COMMENT,
    DELETE_POST, ADD_POST, VIEW_POST} from '../actions/actionTypes';


const initialState = {
    posts: [],
    post: null,
    loading: true,
    comments: null,
    error: {}
}


const postReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case GET_POST:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case VIEW_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [ payload, ...state.posts],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload.id),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => 
                    post._id === payload.id ? {
                        ...post,
                        likes: payload.likes
                    } : post)
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: payload},
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.post.comments.filter(comment =>comment._id !== payload),
                loading: false
            }
        default: return state
    }
}


export default postReducer;