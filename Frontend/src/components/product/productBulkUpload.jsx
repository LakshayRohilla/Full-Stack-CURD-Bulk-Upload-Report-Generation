import React, { useState, useRef } from 'react';
import { useBulkUploadProductsMutation } from '../../store/slice/productApiSlice';
import { Button, LinearProgress, Typography, Box } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function ProductBulkUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const resultRef = useRef(null);

  const [bulkUpload, { isLoading }] = useBulkUploadProductsMutation();

  // Handle file select
  const handleFileChange = (e) => {
    setResult(null);
    setErrorMessage(null);
    const f = e.target.files[0];
    setFile(f || null);
  };

  // Handle upload action
  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select an Excel file first.');
      return;
    }

    try {
      const res = await bulkUpload(file).unwrap();
      setResult(res);
      setFile(null); // reset file state
      document.getElementById('bulk-file').value = ''; // clear input value
      // auto scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setErrorMessage(err?.data?.error || err?.error || 'Bulk upload failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Bulk Upload Products (Excel)
      </Typography>

      {/* Hidden file input */}
      <input
        accept=".xlsx,.xls"
        id="bulk-file"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* File select button */}
      <label htmlFor="bulk-file">
        <Button
          variant="outlined"
          component="span"
          startIcon={<UploadFileIcon />}
          sx={{ mb: 2 }}
        >
          Select Excel File
        </Button>
      </label>

      {/* Show selected file name */}
      {file && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected File: {file.name}
        </Typography>
      )}

      {/* Loading indicator */}
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Upload results */}
      {result && (
        <Box
          ref={resultRef}
          sx={{
            mt: 2,
            p: 2,
            border: '1px solid green',
            backgroundColor: '#e0f2e9',
          }}
        >
          <Typography variant="body1" color="green">
            Success: {result.successCount} products created.
          </Typography>
          <Typography variant="body2" color='black'>
            Total Rows Processed: {result.total}
          </Typography>

          {result.failedCount > 0 && (
            <>
              <Typography variant="body2" color="error">
                {result.failedCount} rows failed:
              </Typography>
              <ul>
                {result.errors.map((err, i) => (
                  <li key={i}>
                    <Typography variant="body2" color="error">
                      Row {err.row}: {err.reason}
                    </Typography>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Box>
      )}

      {/* Error messages */}
      {errorMessage && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            border: '1px solid red',
            backgroundColor: '#f8d7da',
          }}
        >
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        </Box>
      )}

      {/* Upload button */}
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={isLoading || !file} // disable if loading or no file selected
        sx={{ mt: 2 }}
      >
        Start Upload
      </Button>
    </Box>
  );
}