// reducers/index.js
import { combineReducers } from 'redux';
import menu from './menu';
import user from './userReducer';

const reducers = combineReducers({ menu, user });

export default reducers;
