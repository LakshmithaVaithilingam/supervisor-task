import {
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAILURE,
    GOOGLE_LOGOUT,
  } from '../actions/OauthActions';
  
  const initialState = {
    loading: false,
    error: null,
    loggedInUser: null,
  };
  
  const OauthReducer = (state = initialState, action) => {
    switch (action.type) {
      case GOOGLE_LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GOOGLE_LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          loggedInUser: action.payload,
          error: null,
        };
      case GOOGLE_LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case GOOGLE_LOGOUT: 
        return {
        ...state,
        loggedInUser: null,
        };  
      default:
        return state;
    }
  };
  
  export default OauthReducer;
  