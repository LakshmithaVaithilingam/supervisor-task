export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';
export const MARK_TASK_AS_COMPLETED = 'MARK_TASK_AS_COMPLETED';
export const APPROVE_TASK_COMPLETION = 'APPROVE_TASK_COMPLETION';
export const REMOVE_TASK_FROM_REVIEW = 'REMOVE_TASK_FROM_REVIEW';

export const createTaskRequest = (taskData) => ({
  type: CREATE_TASK_REQUEST,
  payload: taskData
});

export const createTaskSuccess = (task) => ({
  type: CREATE_TASK_SUCCESS,
  payload: task
});

export const createTaskFailure = (error) => ({
  type: CREATE_TASK_FAILURE,
  payload: error
});

export const markTaskAsCompleted = (taskId, userId) => ({
  type: MARK_TASK_AS_COMPLETED,
  payload: { taskId, userId } 
})

export const approveTaskCompletion = (taskId) => ({
  type: APPROVE_TASK_COMPLETION,
  payload: taskId
});

export const removeTaskFromReview = (taskId) => ({
  type: REMOVE_TASK_FROM_REVIEW,
  payload: taskId
});