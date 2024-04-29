import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Stack, Typography } from '@mui/material';
import { addUser, updateStatus } from '../../actions/userActions';
import ComponentSkeleton from './ComponentSkeleton';

const User = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [sortByName, setSortByName] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByStatus, setSortByStatus] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      const sampleUserData = [
        { name: 'Task 1', date: new Date('2024-04-19'), status: 'In Progress' },
        { name: 'Task 2', date: new Date('2024-04-20'), status: 'Completed' },
        { name: 'Task 3', date: new Date('2024-04-20'), status: 'Completed' },
      ];

      sampleUserData.forEach(user => {
        dispatch(addUser(user.name, user.date, user.status));
      });
    }
  }, [dispatch, users]);
  

  const handleSortByName = () => {
    setSortByName(!sortByName);
    setSortByDate(false);
    setSortByStatus(false);
  };

  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
    setSortByName(false);
    setSortByStatus(false);
  };

  const handleSortByStatus = () => {
    setSortByStatus(!sortByStatus);
    setSortByName(false);
    setSortByDate(false);
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateStatus(id, newStatus));
  };

  let sortedUsers = [...users];

  if (sortByName) {
    sortedUsers = sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortByDate) {
    sortedUsers = sortedUsers.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (sortByStatus) {
    sortedUsers = sortedUsers.sort((a, b) => a.status.localeCompare(b.status));
  }

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Stack spacing={3}>
            <Typography variant="h4">Users</Typography>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', position: 'relative' }} onClick={handleSortByName}>
                    Task Name
                    {sortByName ? '▲' : '▼'}
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', position: 'relative' }} onClick={handleSortByDate}>
                    Date
                    {sortByDate ? '▲' : '▼'}
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', position: 'relative' }} onClick={handleSortByStatus}>
                    Status
                    {sortByStatus ? '▲' : '▼'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...new Map(sortedUsers.map(user => [user.name, user])).values()].map((user) => (
                  <tr key={user.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.date.toDateString()}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Stack>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
};

export default User;
