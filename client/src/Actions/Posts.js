import axios from 'axios'
import { loadingRequest, getcurrentUserSuccess, getcurrentUserFailure } from './Authenticated'

const loadingPost = () => {
    return {
        type: 'LOADING_POST'
    }
}
//GET POSTS
const getPostsSuccess = posts => {
    return {
        type: 'GET_POSTS_SUCCESS',
        payload: posts
    }
}

const getPostsFailure = error => {
    return {
        type: 'GET_POSTS_FAILURE',
        payload: error
    }
}


//CREATE POST
const createPostSuccess = post => {
    return {
        type: 'CREATE_POST_SUCCESS',
        payload: post
    }
}

const createPostFailure = error => {
    return {
        type: 'CREATE_POST_FAILURE',
        payload: error
    }
}


//DELETE POST
const deletePostSuccess = (post) => {
    return {
        type: 'DELETE_POST_SUCCESS',
        payload: post
    }
}

const deletePostFailure = error => {
    return {
        type: 'DELETE_POST_FAILURE',
        payload: error
    }
}

//GET POST
const getPostSuccess = post => {
    return {
        type: 'GET_POST_SUCCESS',
        payload: post
    }
}

const getPostFailure = error => {
    return {
        type: 'GET_POST_FAILURE',
        payload: error
    }
}

//ADD COMMENT
const addCommentSuccess = comment => {
    return {
        type: 'ADD_COMMENT_SUCCESS',
        payload: comment
    }
}

const addCommentFailure = error => {
    return {
        type: 'ADD_COMMENT_FAILURE',
        payload: error
    }
}

//LIKE AND UNLIKE POST
const likePostSuccess = (like) => {
    return {
        type: 'LIKE_POST_SUCCESS',
        payload: like
    }
}

const likePostFailure = (error) => {
    return {
        type: 'LIKE_POST_FAILURE',
        payload: error
    }
}

const unlikePostSuccess = (like) => {
    return {
        type: 'UNLIKE_POST_SUCCESS',
        payload: like
    }
}


const getOtherUserSuccess = (user) => {
    return {
        type: 'GET_OTHER_USER_SUCCESS',
        payload: user
    }
}

const getOtherUserFailure = (error) => {
    return {
        type: 'GET_OTHER_USER_FAILURE',
        payload: error
    }
}
//-----------------------------


//GET POSTS
export const getPosts = () => {
    return (dispatch) => {
        axios.get('/social/posts')
        .then(res => {

            let listPosts = res.data.map(post => {
                return post
            })
            const posts = listPosts;
            console.log(posts)
            //console.log(posts)
            dispatch(getPostsSuccess(posts))
        })
        .catch(err => {
            const error = err;
            dispatch(getPostsFailure(error))
        })
    }
}


//CREATE POST
export const createPost = (newpost) => {
    return (dispatch) => {
        axios.post('/social/posts/create', newpost)
        .then(res => {

            dispatch(createPostSuccess(res))
        })
        .catch(err => {
            dispatch(createPostFailure(err))
        })
    }
}

//DELETE POST 
export const deletePost = (post) => {
    return (dispatch) => {
        axios.delete(`/social/posts/${post._id}`)
        .then(res => {
            dispatch(deletePostSuccess(post))
            
        })
        .catch(err => {
            dispatch(deletePostFailure(err))
        })
    }
}
  
//GET POST
export const getPost = (postId) => {
    return (dispatch) => {
        //dispatch(loadingPost())
        axios.get(`/social/posts/single/${postId}`)
        .then(res => {

            const post = res;
            //console.log(posts)
            dispatch(getPostSuccess(post))
        })
        .catch(err => {
            const error = err;
            dispatch(getPostFailure(error))
        })
    }
}
  
export const addComment = (newComment) => {
    return (dispatch) => {
        //dispatch(loadingPost())
        axios.post(`/social/posts/createcomment/${newComment.postId}`, newComment)
        .then(res => {

            console.log(res.data)
            //dispatch(getPost(newComment.postId))
            //dispatch(getPosts())
            dispatch(addCommentSuccess(res.data))
        })
        .catch(err => {
            const error = err;
            //dispatch(addCommentFailure(error))
        })
    }
}

export const deleteComment = (comment) => {
    return (dispatch) => {
        dispatch(loadingPost())
        console.log('before the put ')
        axios.put(`/social/posts/deletecomment/${comment.postId}`, comment)
        .then(() => {

            dispatch(getPost(comment.postId))
            //dispatch(getPosts())
            //dispatch(addCommentSuccess(res))
        })
        .catch(err => {
            const error = err;
            //dispatch(addCommentFailure(error))
        })
    }
}

export const likePost = (like) => {
    return (dispatch) => {
        axios.post(`/social/like/${like.postId}`, like)
        .then(() => {
            console.log('likePost is called')
            //dispatch(getPosts())
            dispatch(likePostSuccess(like))
            
        })
        .catch(err => {
            const error = err;
            dispatch(likePostFailure(err))
            //dispatch(addCommentFailure(error))
        })
    }
}

export const unlikePost = (like) => {
    return (dispatch) => {
        //dispatch(loadingPost())
        //console.log('before the put ')
        axios.post(`/social/unlike/${like.postId}`, like)
        .then(() => {
            console.log('unLikePost is called')
            
            dispatch(unlikePostSuccess(like))
        })
        .catch(err => {
            const error = err;
            
        })
    }
}

//GET OTHER USER
export const getOtherUser = (user) => {
    return (dispatch) => {
        //dispatch(loadingPost())
        //console.log('before the put ')
        axios.get(`/users/otheruser/${user}`)
        .then((res) => {
            console.log(res)
            dispatch(getOtherUserSuccess(res))
        })
        .catch(err => {
            dispatch(getOtherUserFailure(err))
        })
    }
}

//CREATE COMMENT (UPDATE POST)
/*export const createComment = (link, newcomment) => {
    return (dispatch) => {
        axios.put(link, newcomment)
        .then(res =>  res)
        .catch(err => err)
    }
}*/
