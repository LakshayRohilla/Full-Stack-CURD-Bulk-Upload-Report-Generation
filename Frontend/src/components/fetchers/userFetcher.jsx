import { useGetUsersQuery, useDeleteUserMutation } from '../../store/slice/userApiSlice';
import CenteralizedTable from '../Shared/UI/centeralizedTable';
import { CircularProgress, Box } from '@mui/material';
import AlertMessage from '../Shared/UI/alertMessage';
import { useNavigate } from 'react-router-dom';

export default function UserFetcher() {
  const { data, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const users = Array.isArray(data?.users) ? data.users : [];

  const columns = [
    { id: 'id', label: 'ID', numeric: true },
    { id: 'email', label: 'Email', numeric: false },
    { id: 'createdAt', label: 'Created At', numeric: false },
    { id: 'updatedAt', label: 'Updated At', numeric: false },
  ];

  const rows = users.map(u => ({
    id: u.id,
    email: u.email,
    createdAt: new Date(u.createdAt).toLocaleString(),
    updatedAt: new Date(u.updatedAt).toLocaleString(),
  }));

  const handleEdit = async (id) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDelete = async (ids) => {
    for (const id of ids) {
      await deleteUser(id).unwrap();
    }
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress/></Box>;
  }
  if (error) {
    return <Box><AlertMessage msg="Unable to fetch users!"/></Box>;
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