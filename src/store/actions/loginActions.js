export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginRequest = (userData) => ({
    type: LOGIN_REQUEST,
    payload: userData
  });
  
  export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData
  });
  
  export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
  });

  export const logout = (userId) => ({
    type: LOGOUT,
    payload: userId
  });