const initState = {
    loading: false,
    currentUser: '',
    notifications: '',
    likes: '',
    error: ''
}

const AuthenticateReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_CURRENTUSER_REQUEST': 
            return {
                ...state,
                loading: true
            }
        case 'GET_CURRENTUSER_SUCCESS': 
            return {
                loading: false,
                //When we submit a post, dashboard is refreshed
                currentUser: action.payload,
                error: ''
            }
        case 'GET_CURRENTUSER_FAILURE': 
            return {
                loading: false,
                currentUser: '',
                error: action.payload
            }
        default: return state
    }
}

export default AuthenticateReducer