import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/authActions';

const initialState = {
  loading: false,
  error: null,
  users: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      console.log('User data received in REGISTER_REQUEST:', action.payload);
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
        console.log('User registration successful:', action.payload);
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload]
      };
    case REGISTER_FAILURE:
        console.error('User registration failed:', action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
