import axios from 'axios'

const getPostsRequest = () => {
    return {
        type: 'GET_POSTS_REQUEST'
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

//GET POSTS
export const getPosts = () => {
    return (dispatch) => {
        dispatch(getPostsRequest())
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
