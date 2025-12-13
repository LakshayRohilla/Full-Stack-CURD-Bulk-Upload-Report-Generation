import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { useCreateUserMutation } from '../../store/slice/userApiSlice';
import AlertMessage from '../Shared/UI/alertMessage';
import SuccessMessage from '../Shared/UI/successMessage';
import { useNavigate } from 'react-router-dom';

export default function UserForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser, { isLoading, isError, error, isSuccess }] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ email, password });
    if (!error) {
      setEmail(''); setPassword('');
    }
    setTimeout(() => {
        navigate('/user')
    }, 500);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{fontWeight:'bold'}} gutterBottom>User Registration</Typography>
      {isError && <AlertMessage msg={error?.data?.message || 'Failed to create user'} />}
      {isSuccess && <SuccessMessage msg="User created successfully!" severity="success" />}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Create User'}
        </Button>
      </Box>
    </Paper>
  );
}