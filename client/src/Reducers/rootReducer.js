import { combineReducers } from 'redux'
import DataReducer from './DataReducer'
import NotificationReducer from './NotificationReducer'
import UsersReducer from './UsersReducer'
import AuthenticateReducer from './AuthenticateReducer'


const rootReducer = combineReducers({
    Data: DataReducer,
    Notifications: NotificationReducer,
    Users: UsersReducer,
    Authenticate: AuthenticateReducer
})

export default rootReducer