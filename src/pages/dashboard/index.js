import React, { useState } from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskRequest, createTaskSuccess, createTaskFailure } from 'store/actions/taskActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const tasks = useSelector((state) => state.tasks.tasks);

  const userNames = users.filter(user => user.role === 'user').map(user => user.firstname);
  
  const initialValues = {
    title: '',
    description: '',
    deadline: '',
    assignedUsers: []
  };

  // // Sample data for tasks in review
  // const tasksInReview = [
  //   { id: 1, title: 'Review Task 1', deadline: '2024-04-30', completedBy: ['User1'] },
  //   { id: 2, title: 'Review Task 2', deadline: '2024-05-05', completedBy: ['User2'] },
  // ];

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
      <Grid item xs={12} md={4}>
        <Paper>
          <Typography variant="h6" component="div" gutterBottom>
            Ongoing Tasks
          </Typography>
          <List>
            {tasks.map((task) => (
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
            {tasks.map((task) => (
              <ListItem key={task.id} disablePadding>
                <ListItemText
                  primary={task.title}
                  secondary={`Deadline: ${task.deadline}, Assigned to: ${task.assignedUsers.join(', ')}`}
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
            {tasks.map((task) => (
              <ListItem key={task.id} disablePadding>
                <ListItemText
                  primary={task.title}
                  secondary={`Deadline: ${task.deadline}, Completed by: ${task.completedBy}`}
                />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" />
                </ListItemSecondaryAction>
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
                    {userNames.map((name) => (
                      <MenuItem key={name} value={name}>{name}</MenuItem>
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
