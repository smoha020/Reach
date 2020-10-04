const initState = {
    loading: false,
    isAuthenticated: '',
    error: ''
}

const AuthenticateReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_AUTHENTICATED_REQUEST': 
            return {
                ...state,
                loading: true
            }
        case 'GET_AUTHENTICATED_SUCCESS': 
            return {
                loading: false,
                //When we submit a post, dashboard is refreshed
                isAuthenticated: action.payload,
                error: ''
            }
        case 'GET_AUTHENTICATED_FAILURE': 
            return {
                loading: false,
                isAuthenticated: '',
                error: action.payload
            }
        default: return state
    }
}

export default AuthenticateReducer