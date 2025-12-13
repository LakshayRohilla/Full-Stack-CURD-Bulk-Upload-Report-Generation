import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { useCreateCategoryMutation } from '../../store/slice/categoryApiSlice';
import AlertMessage from '../Shared/UI/alertMessage';
import SuccessMessage from '../Shared/UI/successMessage';
import { useNavigate } from 'react-router-dom';

export default function CategoryForm() {
  const [name, setName] = useState('');
  const [createCategory, { isLoading, isError, error, isSuccess }] = useCreateCategoryMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory({ name });
    if (!error) {
      setName('');
    }
    setTimeout(() => {
        navigate('/category')
    }, 500);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{fontWeight:'bold'}} gutterBottom>Create Category</Typography>
      {isError && <AlertMessage msg={error?.data?.message || 'Failed to create category'} />}
      {isSuccess && <SuccessMessage msg="Category created successfully!" severity="success" />}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Create Category'}
        </Button>
      </Box>
    </Paper>
  );
}