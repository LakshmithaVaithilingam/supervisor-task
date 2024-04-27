import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskRequest, createTaskSuccess, createTaskFailure, approveTaskCompletion, removeTaskFromReview } from 'store/actions/taskActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const tasks = useSelector((state) => state.tasks.tasks);
  const userRole = useSelector((state) => state.login.loggedInUser.role);

  //const userNames = users.filter(user => user.role === 'user').map(user => user.firstname);
  const userNames = users
  .filter(user => user.role === 'user')
  .map(user => ({ 
    fullName: `${user.firstname} ${user.lastname}`,
    email: user.email 
  }));
  
  const initialValues = {
    id: uuidv4(),
    title: '',
    description: '',
    deadline: '',
    assignedUsers: []
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    deadline: Yup.date().required('Deadline is required'),
    assignedUsers: Yup.array().min(1, 'At least one user should be assigned')
  });

  const handleTaskFormOpen = () => {
    setOpenTaskForm(true);
  };

  const handleTaskFormClose = () => {
    setOpenTaskForm(false);
  };

  const handleTaskApproval = (taskId) => {
    dispatch(approveTaskCompletion(taskId));
    dispatch(removeTaskFromReview(taskId));
  };

  const handleUserChange = (event) => {
  const selectedUser = event.target.value;
  setSelectedUser(selectedUser);
  // If selectedUser is not empty, filter tasks based on the selected user
  if (selectedUser) {
    setFilteredTasks(tasks.filter(task => task.assignedUsers.includes(selectedUser)));
  } else {
    // If selectedUser is empty, show all tasks
    setFilteredTasks(tasks);
  }
};

  const handleTaskFormSubmit = async (values, { resetForm }) => {
    try {
      
      dispatch(createTaskRequest(values));
  
      dispatch(createTaskSuccess(values));
  
      resetForm();
      handleTaskFormClose();
    } catch (error) {
      
      dispatch(createTaskFailure(error.message));
      console.error('Error creating task:', error);
    }
  };
  
  // Authorization check
  if (userRole !== 'supervisor') {
    return (
      <div>
        <Typography variant="h2" gutterBottom>Access Denied</Typography>
        <Typography variant="body1">You are not authorized to access this page.</Typography>
      </div>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" component="div" gutterBottom>
          Supervisor Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleTaskFormOpen}>
          Create Task
        </Button>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="assigned-user-filter-label">Filter by Assigned User</InputLabel>
          <Select
            labelId="assigned-user-filter-label"
            id="assigned-user-filter"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <MenuItem value="">All Users</MenuItem>
            {userNames.map((user) => (
              <MenuItem key={user.email} value={user.email}>{user.fullName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper>
          <Typography variant="h6" component="div" gutterBottom>
            Ongoing Tasks
          </Typography>
          <List>
            {filteredTasks.map((task) => (
              <ListItem key={task.id} disablePadding>
                <ListItemText
                  primary={task.title}
                  secondary={`Deadline: ${task.deadline}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper>
          <Typography variant="h6" component="div" gutterBottom>
            Allocated Tasks
          </Typography>
          <List>
            {filteredTasks.map((task) => (
              <ListItem key={task.id} disablePadding>
              <ListItemText
                primary={task.title}
                secondary={
                  <>
                    Deadline: {task.deadline}
                    <br />
                    Assigned to:
                    <ul style={{ margin: 0, paddingInlineStart: '20px' }}>
                      {task.assignedUsers.map((email) => (
                        <li key={email}>
                          <Tooltip title={email}>
                            <span>{userNames.find(user => user.email === email)?.fullName}</span>
                          </Tooltip>
                        </li>
                      ))}
                    </ul>
                  </>
                }
              />
            </ListItem>
            
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper>
          <Typography variant="h6" component="div" gutterBottom>
            Tasks in Review
          </Typography>
          <List>
            {filteredTasks.map((task) => (
              <ListItem key={task.id} disablePadding>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <ListItemText
                    primary={task.title}
                    secondary={`Deadline: ${task.deadline}`}
                  />
                </Grid>
                <Grid item xs={5}>
                  <ListItemText
                    primary="Completed by:"
                    secondary={
                      <Grid container direction="column" alignItems="flex-start">
                        {task.completedBy.map((email) => (
                          <Grid item key={email}>
                            <Tooltip title={email}>
                              <span>
                                {userNames.find((user) => user.email === email)?.fullName}
                              </span>
                            </Tooltip>
                          </Grid>
                        ))}
                      </Grid>
                    }
                  />
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'right' }}>
                  <ListItemSecondaryAction>
                    <Checkbox edge="end" 
                    onChange={() => handleTaskApproval(task.id)}
                    />
                  </ListItemSecondaryAction>
                </Grid>
              </Grid>
            </ListItem>            
            ))}
          </List>
        </Paper>
      </Grid>
      <Dialog open={openTaskForm} onClose={handleTaskFormClose}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleTaskFormSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  autoFocus
                  margin="dense"
                  id="title"
                  name="title"
                  label="Task Title"
                  type="text"
                  fullWidth
                  error={errors.title && touched.title}
                  helperText={<ErrorMessage name="title" />}
                />
                <Field
                  as={TextField}
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  error={errors.description && touched.description}
                  helperText={<ErrorMessage name="description" />}
                />
                <Field
                  as={TextField}
                  margin="dense"
                  id="deadline"
                  name="deadline"
                  type="date"
                  fullWidth
                  error={errors.deadline && touched.deadline}
                  helperText={<ErrorMessage name="deadline" />}
                />
                <FormControl fullWidth error={errors.assignedUsers && touched.assignedUsers}>
                  <InputLabel id="assigned-users-label">Assigned Users</InputLabel>
                  <Field
                    as={Select}
                    labelId="assigned-users-label"
                    id="assigned-users"
                    name="assignedUsers"
                    multiple
                  >
                    {userNames.map((user) => (
                      <MenuItem key={user.email} value={user.email}>
                      {`${user.fullName} - ${user.email}`}
                    </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="assignedUsers" component="div" className="error" />
                </FormControl>
                <DialogActions>
                  <Button onClick={handleTaskFormClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Create
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default DashboardDefault;
