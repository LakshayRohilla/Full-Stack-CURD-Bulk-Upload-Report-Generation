import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useCreateProductMutation } from '../../store/slice/productApiSlice';
import { useGetCategoriesQuery } from '../../store/slice/categoryApiSlice';
import AlertMessage from '../Shared/UI/alertMessage';
import SuccessMessage from '../Shared/UI/successMessage';
import { useNavigate } from 'react-router-dom';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { data, isLoading: catsLoading, error: catsError } = useGetCategoriesQuery();
  const categories = Array.isArray(data?.categories) ? data.categories : [];
  const navigate = useNavigate();

  const [createProduct, { isLoading, isError, error, isSuccess }] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct({ name, price: Number(price), categoryId: Number(categoryId) });
    if (!error) {
      setName('');
      setPrice('');
      setCategoryId('');
    }
    setTimeout(() => {
        navigate('/product')
    }, 500);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{fontWeight:'bold'}} gutterBottom>Create Product</Typography>

      {catsError && <AlertMessage msg="Unable to load categories" />}
      {isError && <AlertMessage msg={error?.data?.message || 'Failed to create product'} />}
      {isSuccess && <SuccessMessage msg="Product created successfully!" severity="success" />}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={categoryId}
            label="Category"
            required
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {catsLoading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Create Product'}
        </Button>
      </Box>
    </Paper>
  );
}