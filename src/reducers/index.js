import { combineReducers } from '@reduxjs/toolkit'
import UserReducer from "./UserReducer";
export const reducers = combineReducers({
    userInfo: UserReducer
})