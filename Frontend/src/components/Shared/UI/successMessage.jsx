import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function SuccessMessage({msg}) {
  return (
    <Stack spacing={2}>
      <Alert severity="success">{msg}</Alert>
    </Stack>
  );
}
