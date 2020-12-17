import { combineReducers } from 'redux'
import DataReducer from './DataReducer'
import AuthenticateReducer from './AuthenticateReducer'


const rootReducer = combineReducers({
    Data: DataReducer,
    Authenticate: AuthenticateReducer
})

export default rootReducer