const initState = {
    posts: [],
    post: '',
    error: ''
}

const PostReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_POSTS_SUCCESS': 
            return {
                posts: [...action.payload],
                error: ''
            }
        case 'GET_POSTS_FAILURE': 
            return {
                posts: [],
                error: action.payload
            }
        case 'GET_POST_SUCCESS': 
            return {
                ...state,
                post: action.payload,
                error: ''
            }
        case 'GET_POST_FAILURE': 
            return {
                ...state,
                post: '',
                error: action.payload
            }
        default: return state
    }
}

export default PostReducer