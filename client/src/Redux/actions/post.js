import axios from 'axios';
import {setAlert} from './alert';

import {GET_POST, POST_ERROR, UPDATE_LIKES, ADD_COMMENT, REMOVE_COMMENT,
    DELETE_POST, ADD_POST, VIEW_POST} from './actionTypes';


//  Get posts
export const getPost = () => async dispatch => {
    try {
        const res = await axios.get('api/post');

        dispatch({type: GET_POST, payload: res.data});
    } catch (error) {
        dispatch({type: POST_ERROR,
            payload: {msg: error.response.statusText, 
                status: error.response.status}})
    }
}

//  Add Like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`api/post/like/${id}`);

        dispatch({type: UPDATE_LIKES, payload: {id ,likes: res.data}});
    } catch (error) {
        dispatch({type: POST_ERROR,
            payload: {msg: error.response.statusText, 
                status: error.response.status}})
    }
}

//  Remove Like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`api/post/unlike/${id}`);

        dispatch({type: UPDATE_LIKES, payload: {id ,likes: res.data}});
    } catch (error) {
        dispatch({type: POST_ERROR,
            payload: {msg: error.response.statusText, 
                status: error.response.status}})
    }
}

//  Delete Post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`api/post/${id}`);

        dispatch({type: DELETE_POST, payload: {id}});

        dispatch(setAlert('Post Deleted', 'danger'));
    } catch (error) {
        dispatch({type: POST_ERROR,
            payload: {msg: error.response.statusText, 
                status: error.response.status}})
    }
}

//  Create Post
export const createPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`api/post/`, formData, config);

        dispatch({type: ADD_POST, payload: res.data});

        dispatch(setAlert('Post Created', 'success'));
    } catch (error) {
        dispatch({type: POST_ERROR,
            payload: {msg: error.response.statusText, 
                status: error.response.status}})
    }
}

//  Get single post
export const viewPost = id => async dispatch => {
    try {
        const res = await axios.get(`api/post/${id}`);
        // const res = await axios.get('http://localhost:5000/api/post/'+id);

        dispatch({type: VIEW_POST, payload: res.data});
    } catch (error) {
        console.error(error.response)
        dispatch({type: POST_ERROR,
            payload: {msg: error.response.statusText, 
                status: error.response.status}})
    }
}

//  Add Comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`api/post/comment/${postId}`, formData, config);
        // const res = await axios.post(`http://localhost:5000/api/post/comment/${postId}`, formData, config);

        dispatch({type: ADD_COMMENT, payload: res.data});

        dispatch(setAlert('Comment Added', 'success'));
    } catch (error) {
        console.log(error.response);
        dispatch({type: POST_ERROR,
            payload: {msg: error.response.statusText, 
                status: error.response.status}})
    }
}

//  Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
       await axios.delete(`api/post/comment/${postId}/${commentId}`, );
    //    await axios.delete(`http://localhost:5000/api/post/comment/${postId}/${commentId}`, );

        dispatch({type: REMOVE_COMMENT, payload: commentId});

        dispatch(setAlert('Comment Removed', 'danger'));
    } catch (error) {
        console.error(error.message);
        dispatch({type: POST_ERROR,
            payload: {msg: error.response.statusText, 
                status: error.response.status}})
    }
}