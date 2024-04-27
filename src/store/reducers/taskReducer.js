// taskReducer.js

import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  MARK_TASK_AS_COMPLETED,
  APPROVE_TASK_COMPLETION,
  REMOVE_TASK_FROM_REVIEW
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
    case APPROVE_TASK_COMPLETION:
      taskId = action.payload;
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === taskId ? { ...task, status: 'Completed' } : task
        )
      };
    case REMOVE_TASK_FROM_REVIEW:
      taskId = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== taskId)
      };  
    default:
      return state;
  }
};

export default taskReducer;
