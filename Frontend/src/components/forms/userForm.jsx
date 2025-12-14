import { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, CircularProgress } from '@mui/material';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../../store/slice/userApiSlice';
import AlertMessage from '../Shared/UI/alertMessage';
import SuccessMessage from '../Shared/UI/successMessage';
import { useNavigate } from 'react-router-dom';

export default function UserForm({ user }) {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  
  const [createUser, { isLoading: isCreating, isError: isCreateError, error: createError, isSuccess: isCreateSuccess }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating, isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPassword('');
    }
  }, [user]);

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      setEmail('');
      setPassword('');
      navigate('/user'); 
    }
  }, [isCreateSuccess, isUpdateSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await updateUser({ id: user.id, email, ...(password && { password }) }).unwrap();
    } else {
      await createUser({ email, password }).unwrap();
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
        {user ? 'Edit User' : 'User Registration'}
      </Typography>

      {(isCreateError || isUpdateError) && (
        <AlertMessage msg={(createError || updateError)?.data?.message || 'Failed to save user'} />
      )}
      {(isCreateSuccess || isUpdateSuccess) && (
        <SuccessMessage msg="User saved successfully!" severity="success" />
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <TextField label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField
          label="Password"
          type="password"
          required={!user} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={user ? "Leave blank to keep current password" : ""}
        />
        <Button type="submit" variant="contained" disabled={isCreating || isUpdating}>
          {(isCreating || isUpdating) ? <CircularProgress size={24} /> : user ? 'Update User' : 'Create User'}
        </Button>
      </Box>
    </Paper>
  );
}