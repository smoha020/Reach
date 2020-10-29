import axios from 'axios'

export const loadingRequest = () => {
    return {
        type: 'LOADING_REQUEST'
    }
}

export const getcurrentUserSuccess = currentUser => {
    return {
        type: 'GET_CURRENTUSER_SUCCESS',
        payload: currentUser
    }
}

export const getcurrentUserFailure = error => {
    return {
        type: 'GET_CURRENTUSER_FAILURE',
        payload: error
    }
}

//----
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


//----methods?
export const getAuthenticated = () => {
    return (dispatch) => {
        dispatch(loadingRequest())
        console.log('loading being set for getAuth')
        axios.get('/test')
        .then(res => {
            const currentUser = res;
            dispatch(getcurrentUserSuccess(currentUser))
            console.log('loading no longer set for getAuth')
        })
        .catch(err => {
            const error = err;
            dispatch(getcurrentUserFailure(error))
        })
    }
}
 
export const signIn = (user) => {
    return (dispatch) => {
        dispatch(loadingRequest())
        axios.post('/users/login', user)
        .then(res => {
            console.log(res)
            const currentUser = res;
            dispatch(getcurrentUserSuccess(currentUser))
        })
        .catch((err) => {
            const error = err;
            dispatch(getcurrentUserFailure(error))
            /*axios.get('/test')
            .then(res => {
                console.log(res)
                const isAuthenticated = res;
                dispatch(getcurrentUserSuccess(isAuthenticated))
            })
            .catch(err => {
                const error = err;
                dispatch(getcurrentUserFailure(error))
            })*/
            
        })
    }
}

export const signOut = () => {
    console.log('signOut')
    /*return (dispatch) => {
        dispatch(loadingRequest())
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
    }*/
}