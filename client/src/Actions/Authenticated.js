import axios from 'axios'

const getAuthenticatedRequest = () => {
    return {
        type: 'GET_AUTHENTICATED_REQUEST'
    }
}

const getAuthenticatedSuccess = isAuthenticated => {
    return {
        type: 'GET_AUTHENTICATED_SUCCESS',
        payload: isAuthenticated
    }
}

const getAuthenticatedFailure = error => {
    return {
        type: 'GET_AUTHENTICATED_FAILURE',
        payload: error
    }
}


export const getAuthenticated = () => {
    return (dispatch) => {
        dispatch(getAuthenticatedRequest())
        axios.get('/test')
        .then(res => {
            console.log(res)
            const isAuthenticated = res;
            dispatch(getAuthenticatedSuccess(isAuthenticated))
        })
        .catch(err => {
            const error = err;
            dispatch(getAuthenticatedFailure(error))
        })
    }
}

export const signIn = (user) => {
    return (dispatch) => {
        dispatch(getAuthenticatedRequest())
        axios.post('/users/login', user)
        .then(res => {
            console.log(res)
            const isAuthenticated = res;
            dispatch(getAuthenticatedSuccess(isAuthenticated))
        })
        .catch(() => {
            
            axios.get('/test')
            .then(res => {
                console.log(res)
                const isAuthenticated = res;
                dispatch(getAuthenticatedSuccess(isAuthenticated))
            })
            .catch(err => {
                const error = err;
                dispatch(getAuthenticatedFailure(error))
            })
            
        })
    }
}

export const signOut = () => {
    return (dispatch) => {
        dispatch(getAuthenticatedRequest())
        axios.get('users/logout')
        .then(res => {
            console.log(res)
            const isAuthenticated = res;
            dispatch(getAuthenticatedSuccess(isAuthenticated))
        })
        .catch(err => {
            const error = err;
            dispatch(getAuthenticatedFailure(error))
        })
    }
}