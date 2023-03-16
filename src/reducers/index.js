import { combineReducers } from '@reduxjs/toolkit'
import UserReducer from "./UserReducer";
import ChatReducer from "./ChatReducer";
import AuthReducer from "./AuthReducer";
export const reducers = combineReducers({
    userInfo: UserReducer,
    chatInfo: ChatReducer,
    authMange: AuthReducer
})