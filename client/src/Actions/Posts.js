import axios from 'axios'

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
    console.log('outside createPost')
    return (dispatch) => {
        console.log('inside createPost')
        axios.post('/social/posts/create', newpost)
        .then(res => {

            console.log('returned: ' + res)
            dispatch(createPostSuccess(res))
            console.log('new post')
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
            console.log('deleted the post')
            
        })
        .catch(err => {
            dispatch(deletePostFailure(err))
        })
    }
}

//GET POST
export const getPost = (postId) => {
    console.log('are we in getPost?')
    return (dispatch) => {
        dispatch(loadingPost())
        axios.get(`/social/posts/single/${postId}`)
        .then(res => {

            console.log('inside getPost')
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
        dispatch(loadingPost())
        axios.post(`/social/posts/createcomment/${newComment.postId}`, newComment)
        .then(res => {

            console.log("inside addComment")
            dispatch(getPost(newComment.postId))
            dispatch(getPosts())
            //dispatch(addCommentSuccess(res))
        })
        .catch(err => {
            const error = err;
            //dispatch(addCommentFailure(error))
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
