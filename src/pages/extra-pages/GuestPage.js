import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth'; 
import { auth } from '  FirebaseConfig'; 
import { googleLogout } from 'store/actions/OauthActions';
import { useNavigate } from 'react-router-dom';

const GuestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      dispatch(googleLogout());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>Hi, Guest!</h1>
      <p>Welcome to our website. Please sign in to access more features.</p>
      <Button variant="outlined" color="secondary" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default GuestPage;
