import axios from 'axios'

const loadingRequest = () => {
    return {
        type: 'LOADING_REQUEST'
    }
}

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
 
export const getPost = (post) => {
    return (dispatch) => {
        axios.get(`/social/posts/single/${post._id}`)
        .then(res => {

            console.log(res)
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

//CREATE POST
export const createPost = (newpost) => {
    return (dispatch) => {
        axios.post('/social/posts', newpost)
        .then(res => console.log('we hit the post'))
        .catch(err => err)
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
