// reducers/userReducer.js
const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'UPDATE_STATUS':
      const { index, status } = action.payload;
      if (index >= 0 && index < state.users.length) {
        return {
          ...state,
          users: state.users.map((user, i) => (i === index ? { ...user, status } : user)),
        };
      } else {
        console.error('Invalid index provided for updating status:', index);
        return state;
      }
    default:
      return state;
  }
};

export default userReducer;
