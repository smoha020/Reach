const initState = {
    loading: true,
    currentUser: '',
    notifications: '',
    likes: '',
    error: ''
}

const AuthenticateReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOADING_REQUEST': 
            return {
                ...state,
                loading: true
            }
        case 'GET_CURRENTUSER_SUCCESS': 
            return {
                loading: false,
                //When we submit a post, dashboard is refreshed
                currentUser: action.payload,
                likes: [...action.payload.data.likes],
                error: ''
            }
        case 'GET_CURRENTUSER_FAILURE': 
            return {
                loading: false,
                currentUser: '',
                likes: '',
                error: action.payload
            }
        case 'LIKE_POST_SUCCESS': 
            return {
                ...state,
                likes: [...state.likes, action.payload],
                loading: false,
            }
        case 'UNLIKE_POST_SUCCESS': 

        let newLikes = state.likes.filter(like => like.postId != action.payload.postId)
        console.log(newLikes)
            return {
                ...state,
                likes: [...newLikes],
                loading: false,
            }
        case 'LIKE_POST_FAILURE': 
            return {
                ...state,
                likes: '',
                loading: false,
            }
        case 'GET_UPDATEDUSER_SUCCESS': 
            return {
                ...state, 
                loading: false, 
                currentUser: action.payload, 
                error: '' 
            }
        case 'GET_UPDATEDUSER_FAILURE': 
            return {
                ...state,
                loading: false,
                currentUser: '',
                error: action.payload
            }
        default: return state
    }
}

export default AuthenticateReducer