import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../store/slice/categoryApiSlice';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

const CategoryForm = ({ category }) => {
  const [name, setName] = useState(category ? category.name : '');
  const navigate = useNavigate();
  const [createCategory, { isSuccess: isCreateSuccess }] = useCreateCategoryMutation();
  const [updateCategory, { isSuccess: isUpdateSuccess }] = useUpdateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category) {
      await updateCategory({ id: category.id, name }).unwrap();
    } else {
      await createCategory({ name }).unwrap();
    }
    navigate('/category'); 
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      setName('');
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>{category ? "Edit Category" : "Create Category"}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="contained">
          {category ? "Update Category" : "Create Category"}
        </Button>
      </Box>
    </Paper>
  );
};

export default CategoryForm;