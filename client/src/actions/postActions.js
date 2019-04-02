import axios from 'axios';

import { 
    ADD_POST,
    GET_ERRORS,
    GET_POST,
    GET_POSTS,
    POST_LOADING,
    DELETE_POST,
    CLEAR_ERRORS
} from './types';


// Add post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/post', postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(error => 
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
}

// Get Posts
export const getPosts = () => dispatch => {
    axios
        .get('/api/posts')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(error =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
}

// Get individual post
export const getPost = id => dispatch => {
    axios
        .get(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(error =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        );
}

// Delete Post
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/post/delete/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(error =>
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
}

// Add Like to Post
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(error => 
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
}

// Remove Like to Post
export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(error => 
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
}

// Add Comment
export const addComment = (id, data) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${id}`, data)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(error =>
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
}

// deleteComment
export const deleteComment = (id, commentId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${id}/${commentId}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(error =>
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
}

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

// Clear Errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}