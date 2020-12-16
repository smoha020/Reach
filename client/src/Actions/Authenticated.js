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

export const getupdatedUserSuccess = credentials => {
    return {
        type: 'GET_UPDATEDUSER_SUCCESS',
        payload: credentials
    }
}

export const getupdatedUserFailure = error => {
    return {
        type: 'GET_UPDATEDUSER_FAILURE',
        payload: error
    }
}

export const logOutSuccess = () => {
    return {
        type: 'LOG_OUT_SUCCESS',
    }
}

export const logOutFailure = error => {
    return {
        type: 'LOG_OUT_FAILURE',
        payload: error
    }
}

export const getNoteReadSuccess = (note) => {
    return {
        type: 'GET_NOTEREAD_SUCCESS',
        payload: note
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
    
    return (dispatch) => {
        dispatch(loadingRequest())
        console.log('before the get request')
        axios.get('users/logout')
        .then((res) => {
            console.log(res)
            console.log('logging out?')
            dispatch(logOutSuccess())
        })
        .catch(err => {
            const error = err;
            dispatch(logOutFailure(error))
        })
    }
}

export const registerUser = (user) => {
    return (dispatch) => {
        dispatch(loadingRequest())
        axios.post('/users/register', user)
        .then(res => {
            console.log(res)
            
            let currentUser = res
            let loginUser = {
                email: user.email,
                password: user.password
            } 
            dispatch(signIn(loginUser))
            //dispatch(getcurrentUserSuccess(currentUser))
        })
        .catch((err) => {
            const error = err;
            dispatch(getcurrentUserFailure(error))
            
        })
    }
}

export const updateUser = (user) => {
    return (dispatch) => {

        dispatch(loadingRequest())
        axios.post(`/users/update/${user._id}`, user)
        .then(res => {
            console.log(res)
            
            dispatch(getcurrentUserSuccess(res))
        })
        .catch((err) => {
            const error = err;
            dispatch(getcurrentUserFailure(error))
            
        })
    }
}

export const NoteRead = (note) => {
    return (dispatch) => {

    axios.put(`/social/notificationRead/${note._id}`)
        .then(data => {
            
            dispatch(getNoteReadSuccess(note))
        })
        .catch(err => console.log(err))

    }
}