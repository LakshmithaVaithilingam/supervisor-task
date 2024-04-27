import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { markTaskAsCompleted } from 'store/actions/taskActions'; // Import the action for marking tasks as completed

const SamplePage = () => {
  const loggedInUser = useSelector(state => state.login.loggedInUser);
  const userTasks = useSelector(state => state.tasks.tasks.filter(task => task.assignedUsers.includes(loggedInUser.email)));
  const dispatch = useDispatch();

  const handleTaskCompletion = (taskId) => {
    // Dispatch the action to mark the task as completed only for the current user
    dispatch(markTaskAsCompleted(taskId, loggedInUser.email));
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>Welcome, {loggedInUser.firstname} {loggedInUser.lastname}!</Typography>
      <Typography variant="h3" gutterBottom>Your Tasks:</Typography>
      <List>
        {userTasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.title}
              secondary={`Deadline: ${task.deadline}, Status: ${task.completedBy.includes(loggedInUser.email) ? 'Completed' : 'Pending Review'}`}
            />
            {/* Button to mark task as completed, enable only if task is not completed by current user */}
            {!task.completedBy.includes(loggedInUser.email) && (
              <Button variant="contained" onClick={() => handleTaskCompletion(task.id)}>Mark as Completed</Button>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};


export default SamplePage;
