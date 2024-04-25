// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import menu from './menu';
import authReducer from './authReducer';
import loginReducer from './loginReducer';
import OauthReducer from './OauthReducer';
import taskReducer from './taskReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers with Redux Persist
const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  Oauth: OauthReducer,
  tasks: taskReducer,
  menu
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
