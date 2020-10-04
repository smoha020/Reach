import { combineReducers } from 'redux'
import PostReducer from './PostReducer'
import NotificationReducer from './NotificationReducer'
import UsersReducer from './UsersReducer'
import AuthenticateReducer from './AuthenticateReducer'


const rootReducer = combineReducers({
    Posts: PostReducer,
    Notifications: NotificationReducer,
    Users: UsersReducer,
    Authenticate: AuthenticateReducer
})

export default rootReducer