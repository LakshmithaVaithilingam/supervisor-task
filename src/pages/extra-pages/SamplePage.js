import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Button, FormControl, Select, MenuItem } from '@mui/material';
import { markTaskAsCompleted } from 'store/actions/taskActions'; // Import the action for marking tasks as completed

const SamplePage = () => {
  const loggedInUser = useSelector(state => state.login.loggedInUser);
  const tasks = useSelector(state => state.tasks.tasks.filter(task => task.assignedUsers.includes(loggedInUser.email)));
  const userRole = useSelector((state) => state.login.loggedInUser.role);
  const dispatch = useDispatch();
  const [selectedDeadline, setSelectedDeadline] = useState(''); // State to hold the selected deadline filter

  const handleTaskCompletion = (taskId) => {
    // Dispatch the action to mark the task as completed only for the current user
    dispatch(markTaskAsCompleted(taskId, loggedInUser.email));
  };

  // Filter tasks by deadline range
  const filteredTasks = selectedDeadline
    ? tasks.filter(task => task.deadline === selectedDeadline)
    : tasks;

  // Authorization check
  if (userRole !== 'user') {
    return (
      <div>
        <Typography variant="h2" gutterBottom>Access Denied</Typography>
        <Typography variant="body1">You are not authorized to access this page.</Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>Welcome, {loggedInUser.firstname} {loggedInUser.lastname}!</Typography>
      <Typography variant="h3" gutterBottom>Your Tasks:</Typography>
      {/* Dropdown to filter tasks by deadline */}
      <FormControl fullWidth>
        <Select
          value={selectedDeadline}
          onChange={(event) => setSelectedDeadline(event.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Deadline
          </MenuItem>
          {/* You can dynamically generate options based on unique deadlines */}
          {Array.from(new Set(tasks.map(task => task.deadline))).map((deadline) => (
            <MenuItem key={deadline} value={deadline}>{deadline}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <List>
        {filteredTasks.map(task => (
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
