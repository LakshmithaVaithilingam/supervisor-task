import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/loginActions';

// Initial state for authentication
const initialState = {
  loading: false,
  error: null,
  loggedInUser: []
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case LOGOUT:
        return {
          ...state,
          loggedInUser: null 
        };
    default:
      return state;
  }
};

export default loginReducer;