const initState = {
    loading: false,
    posts: [],
    error: ''
}

const PostReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_POSTS_REQUEST': 
            return {
                ...state,
                loading: true
            }
        case 'GET_POSTS_SUCCESS': 
            return {
                loading: false,
                posts: [...action.payload],
                error: ''
            }
        case 'GET_POSTS_FAILURE': 
            return {
                loading: false,
                posts: [],
                error: action.payload
            }
        default: return state
    }
}

export default PostReducer