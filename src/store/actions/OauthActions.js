export const GOOGLE_LOGIN_REQUEST = 'GOOGLE_LOGIN_REQUEST';
export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS';
export const GOOGLE_LOGIN_FAILURE = 'GOOGLE_LOGIN_FAILURE';

export const googleLoginRequest = () => ({
  type: GOOGLE_LOGIN_REQUEST,
});

export const googleLoginSuccess = (userData) => ({
  type: GOOGLE_LOGIN_SUCCESS,
  payload: userData,
});

export const googleLoginFailure = (error) => ({
  type: GOOGLE_LOGIN_FAILURE,
  payload: error,
});
