import { useGetUsersQuery } from '../../store/slice/userApiSlice';
import CenteralizedTable from '../Shared/UI/centeralizedTable';
import { CircularProgress, Box } from '@mui/material';
import AlertMessage from '../Shared/UI/alertMessage';

export default function UserFetcher() {
  const { data, error, isLoading } = useGetUsersQuery();

  const users = Array.isArray(data?.users) ? data.users : [];

  const columns = [
    { id: 'id', label: 'ID', numeric: true },
    { id: 'email', label: 'Email', numeric: false },
    { id: 'createdAt', label: 'Created At', numeric: false },
    { id: 'updatedAt', label: 'Updated At', numeric: false },
  ];

  const rows = users.map((u) => ({
    id: u.id,
    email: u.email,
    createdAt: new Date(u.createdAt).toLocaleString(),
    updatedAt: new Date(u.updatedAt).toLocaleString(),
  }));

  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
  };

  const handleDelete = (ids) => {
    console.log(`Delete users with ids:`, ids);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <AlertMessage msg="Unable to fetch the users!!" />
      </Box>
    );
  }

  return (
    <CenteralizedTable
      title="Users"
      columns={columns}
      rows={rows}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}