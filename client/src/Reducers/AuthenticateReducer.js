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
                currentUser: action.payload.data,
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
                currentUser: action.payload.data, 
                error: '' 
            }
        case 'GET_UPDATEDUSER_FAILURE': 
            return {
                ...state,
                loading: false,
                currentUser: '',
                error: action.payload
            }
        case 'LOG_OUT_SUCCESS': 
            return {
                loading: false,
                //When we submit a post, dashboard is refreshed
                currentUser: '',
                notifications: '',
                likes: '',
                error: ''
            }
        case 'LOG_OUT_FAILURE': 
            return {
                loading: false,
                currentUser: '',
                notifications: '',
                likes: '',
                error: action.payload
            }
        case 'GET_NOTEREAD_SUCCESS': 
        let filterNotes = state.currentUser.notifications.filter(note => note._id != action.payload._id)
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifications: [...filterNotes]
                }
            }
        default: return state
    }
}

export default AuthenticateReducer