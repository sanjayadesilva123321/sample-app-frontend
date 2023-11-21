import { combineReducers } from '@reduxjs/toolkit';
import commonReducer from './reducers/common';
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import reducerTypes from './reducerTypes';

const rootReducer = {};
rootReducer[reducerTypes.common] = commonReducer;
rootReducer[reducerTypes.auth] = authReducer;
rootReducer[reducerTypes.user] = userReducer;

export default combineReducers(rootReducer);
