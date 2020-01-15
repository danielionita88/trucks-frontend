import {combineReducers} from 'redux'
import user from './user'
import posts from './posts'
import googleKey from './googleKey'

export default combineReducers({
    user,
    posts,
    googleKey
})