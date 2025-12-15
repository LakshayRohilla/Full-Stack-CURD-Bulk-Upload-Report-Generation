import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../store/slice/categoryApiSlice';
import { useDownloadProductReportMutation } from '../../store/slice/reportApiSlice';

export default function ReportForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [format, setFormat] = useState('csv');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { data: categoryData, isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();
  const categories = Array.isArray(categoryData?.categories) ? categoryData.categories : [];

  const [downloadProductReport, { isLoading: isDownloading }] = useDownloadProductReportMutation();

  const handleDownloadReport = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const blob = await downloadProductReport({ startDate, endDate, categoryId, format }).unwrap();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `products_report_${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      setError('Failed to download report. Please try again.');
    }
  };

  const handlePreviewReport = (e) => {
    e.preventDefault();
    navigate('/reports/display', { state: { startDate, endDate, categoryId } });
  };

  return (
    <Box component="form" sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Generate Product Report
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {categoriesError && <Alert severity="error" sx={{ mb: 2 }}>Failed to load categories</Alert>}

      <TextField
        label="Start Date"
        type="date"
        fullWidth
        sx={{ mb: 2 }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        fullWidth
        sx={{ mb: 2 }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={categoryId}
          label="Category"
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={categoriesLoading}
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="format-select-label">Format</InputLabel>
        <Select
          labelId="format-select-label"
          value={format}
          label="Format"
          onChange={(e) => setFormat(e.target.value)}
        >
          <MenuItem value="csv">CSV</MenuItem>
          <MenuItem value="xlsx">XLSX</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={handlePreviewReport}
          variant="outlined"
          disabled={isDownloading}
          fullWidth
        >
          Preview Report
        </Button>

        <Button
          onClick={handleDownloadReport}
          variant="contained"
          disabled={isDownloading}
          fullWidth
        >
          {isDownloading ? <CircularProgress size={24} /> : 'Download Report'}
        </Button>
      </Box>
    </Box>
);
}