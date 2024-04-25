import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { markTaskAsCompleted } from 'store/actions/taskActions'; // Import the action for marking tasks as completed

const SamplePage = () => {
  const loggedInUser = useSelector(state => state.login.loggedInUser);
  const userTasks = useSelector(state => state.tasks.tasks.filter(task => task.assignedUsers.includes(loggedInUser.firstname)));
  const dispatch = useDispatch();

  const handleTaskCompletion = (taskId) => {
    // Dispatch the action to mark the task as completed only for the current user
    dispatch(markTaskAsCompleted(taskId, loggedInUser.firstname));
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>Welcome, {loggedInUser.firstname}!</Typography>
      <Typography variant="h3" gutterBottom>Your Tasks:</Typography>
      <List>
        {userTasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.title}
              secondary={`Deadline: ${task.deadline}, Status: ${task.completedBy.includes(loggedInUser.firstname) ? 'Completed' : 'Pending Review'}`}
            />
            {/* Button to mark task as completed, enable only if task is not completed by current user */}
            {!task.completedBy.includes(loggedInUser.firstname) && (
              <Button variant="contained" onClick={() => handleTaskCompletion(task.id)}>Mark as Completed</Button>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};


export default SamplePage;
