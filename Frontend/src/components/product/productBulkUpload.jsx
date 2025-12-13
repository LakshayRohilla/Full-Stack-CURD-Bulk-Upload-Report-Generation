import React, { useState, useRef } from 'react';
import { useBulkUploadProductsMutation } from '../../store/slice/productApiSlice';
import { Button, LinearProgress, Typography, Box, Paper } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import bulkUploadTemplateFile from '../../assets/bulk_upload_template.xlsx';

export default function ProductBulkUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const resultRef = useRef(null);

  const [bulkUpload, { isLoading }] = useBulkUploadProductsMutation();

  const handleFileChange = (e) => {
    setResult(null);
    setErrorMessage(null);
    const f = e.target.files[0];
    setFile(f || null);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select an Excel file first.');
      return;
    }
    try {
      const res = await bulkUpload(file).unwrap();
      setResult(res);
      setFile(null);
      document.getElementById('bulk-file').value = '';
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setErrorMessage(err?.data?.error || err?.error || 'Bulk upload failed');
    }
  };

  const handleTemplateDownload = () => {
    window.location.href = bulkUploadTemplateFile;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, px: 2 }}>
      {/* Row above the card: title (left) and template download (right) */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          📦 Bulk Upload Products (Excel)
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<FileDownloadIcon />}
          onClick={handleTemplateDownload}
        >
          Download Excel Template
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Hidden file input */}
        <input
          accept=".xlsx,.xls"
          id="bulk-file"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2 }}>
          <label htmlFor="bulk-file" style={{ margin: 0 }}>
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadFileIcon />}
            >
              Select Excel File
            </Button>
          </label>

          <Button
            variant="contained"
            color="success"
            onClick={handleUpload}
            disabled={isLoading || !file}
          >
            Start Upload
          </Button>
        </Box>

        {file && (
          <Typography variant="body2" sx={{ mt: 1, mb: 2, fontStyle: 'italic' }}>
            Selected File: {file.name}
          </Typography>
        )}

        {isLoading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Result Section */}
        {result && (
          <Box
            ref={resultRef}
            sx={{
              mt: 2,
              p: 2,
              border: '2px solid green',
              backgroundColor: '#e6f4ea',
              borderRadius: 1
            }}
          >
            <Typography variant="subtitle1" color="green" fontWeight="bold">
              ✅ Upload Successful
            </Typography>
            <Typography variant="body1">
              {result.successCount} products created.
            </Typography>
            <Typography variant="body2">
              Total Rows Processed: {result.total}
            </Typography>

            {result.failedCount > 0 && (
              <>
                <Typography variant="body2" color="error" mt={1}>
                  ❌ {result.failedCount} rows failed:
                </Typography>
                <ul style={{ marginTop: '0.5rem' }}>
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

        {/* Error Section */}
        {errorMessage && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: '2px solid red',
              backgroundColor: '#fdecea',
              borderRadius: 1
            }}
          >
            <Typography variant="subtitle1" color="error" fontWeight="bold">
              ⚠️ Error
            </Typography>
            <Typography variant="body2">{errorMessage}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}