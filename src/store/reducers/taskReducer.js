// taskReducer.js

import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  MARK_TASK_AS_COMPLETED
} from '../actions/taskActions';

const initialState = {
  loading: false,
  error: null,
  tasks: []
};

const taskReducer = (state = initialState, action) => {
  let taskId, userId; 

  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, { ...action.payload, completedBy: [] }]
      };
    case CREATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case MARK_TASK_AS_COMPLETED:
      taskId = action.payload.taskId;
      userId = action.payload.userId;

      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === taskId && task.assignedUsers.includes(userId)
            ? { ...task, completedBy: [...task.completedBy, userId] }
            : task
        )
      };
    default:
      return state;
  }
};

export default taskReducer;
