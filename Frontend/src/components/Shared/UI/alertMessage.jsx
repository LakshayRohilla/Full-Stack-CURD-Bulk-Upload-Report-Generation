import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertMessage({msg}) {
  return (
    <Stack spacing={2}>
      <Alert severity="error">{msg}</Alert>
    </Stack>
  );
}
