import { useState, useEffect } from 'react';
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
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '../../store/slice/productApiSlice';
import { useGetCategoriesQuery } from '../../store/slice/categoryApiSlice';
import AlertMessage from '../Shared/UI/alertMessage';
import SuccessMessage from '../Shared/UI/successMessage';
import { useNavigate } from 'react-router-dom';

export default function ProductForm({ product }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const { data, isLoading: catsLoading, error: catsError } = useGetCategoriesQuery();
  const categories = Array.isArray(data?.categories) ? data.categories : [];

  const [
    createProduct,
    { isLoading: isCreating, isError: isCreateError, error: createError, isSuccess: isCreateSuccess },
  ] = useCreateProductMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess },
  ] = useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price?.toString() || '');
      setCategoryId(product.categoryId ? String(product.categoryId) : '');
    }
  }, [product]);

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      setName('');
      setPrice('');
      setCategoryId('');
      navigate('/product');
    }
  }, [isCreateSuccess, isUpdateSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      price: Number(price),
      categoryId: Number(categoryId), 
    };

    if (product) {
      await updateProduct({ id: product.id, ...payload }).unwrap();
    } else {
      await createProduct(payload).unwrap();
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
        {product ? 'Edit Product' : 'Create Product'}
      </Typography>

      {catsError && <AlertMessage msg="Unable to load categories" />}
      {(isCreateError || isUpdateError) && (
        <AlertMessage msg={(createError || updateError)?.data?.message || 'Failed to save product'} />
      )}
      {(isCreateSuccess || isUpdateSuccess) && (
        <SuccessMessage msg="Product saved successfully!" severity="success" />
      )}

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
                <MenuItem key={c.id} value={String(c.id)}>
                  {c.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" disabled={isCreating || isUpdating}>
          {(isCreating || isUpdating) ? (
            <CircularProgress size={24} />
          ) : product ? 'Update Product' : 'Create Product'}
        </Button>
      </Box>
    </Paper>
  );
}