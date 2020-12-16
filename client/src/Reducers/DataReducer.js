const initState = {
    otherUser: '',
    posts: [],
    post: '',
    error: '',
    comment: '',
    loadingPost: true
}

const PostReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOADING_POST':
            return {
                ...state,
                loadingPost: true
            }
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
        case 'CREATE_POST_SUCCESS': 
            return {
                posts: [action.payload.data, ...state.posts],
                error: ''
            }
        case 'CREATE_POST_FAILURE': 
            return {
                ...state,
                error: action.payload
            }
        case 'GET_POST_SUCCESS': 
            return {
                ...state,
                //loadingPost: false,
                post: action.payload,
                error: ''
            }
        case 'GET_POST_FAILURE': 
            return {
                ...state,
                //loadingPost: false,
                post: '',
                error: action.payload
            }
        case 'DELETE_POST_SUCCESS': 
            return {
                ...state,
                posts: state.posts.filter( post => post != action.payload),
                //in case we delete from User component
                otherUser: {
                    ...state.otherUser,
                    posts: state.otherUser.posts.filter( post => post != action.payload)
                },
                error: ''
            }
        case 'DELETE_POST_FAILURE': 
            return {
                ...state,
                error: action.payload
            }
        case 'ADD_COMMENT_SUCCESS': 
            //state.post.data.comments = [...state.post.data.comments, action.payload]
            let index = state.posts.findIndex(post => post._id === action.payload.postId)
            state.posts[index].commentCount ++
            console.log('inside add comment reducer')
            return {
                ...state,
                //loadingPost: false, 
                post: {
                    ...state.post,
                   data: {
                       ...state.post.data,
                       comments: [action.payload, ...state.post.data.comments]
                    }
                }
            }
        case 'ADD_COMMENT_FAILURE': 
            return {
                ...state,
                loadingPost: false, 
                error: action.payload
            }
        case 'LIKE_POST_SUCCESS': 
            let index2 = state.posts.findIndex(post => post._id === action.payload.postId)
            state.posts[index2].likeCount ++
            /*let updatedPost = state.posts[index2]
            updatedPost.likeCount = updatedPost.likeCount + 1
            state.posts[index2] = updatedPost*/
            return {
                ...state
            }
        case 'UNLIKE_POST_SUCCESS': 
        let index1 = state.posts.findIndex(post => post._id === action.payload.postId)
        state.posts[index1].likeCount--
            return {
                ...state
            }
        case 'GET_OTHER_USER_SUCCESS': 
            return {
                ...state,
                loadingPost: false,
                otherUser: action.payload
            }
        case 'GET_OTHER_USER_FAILURE': 
            return {
                ...state,
                loadingPost: false,
                error: action.payload
            }
        default: return state
    }
}

export default PostReducer