// actions/userActions.js
export const addUser = (name, date, status) => ({
  type: 'ADD_USER',
  payload: { name, date, status },
});

export const updateStatus = (index, status) => ({
  type: 'UPDATE_STATUS',
  payload: { index, status },
});
