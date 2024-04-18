// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authReducer from './authReducer';
import loginReducer from './loginReducer';
import OauthReducer from './OauthReducer';
import taskReducer from './taskReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    auth: authReducer,
    login: loginReducer,
    Oauth: OauthReducer,
    tasks: taskReducer,
    menu
  });

export default reducers;
