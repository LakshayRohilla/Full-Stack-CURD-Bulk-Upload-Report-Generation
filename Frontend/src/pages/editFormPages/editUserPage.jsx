import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../store/slice/userApiSlice';
import UserForm from '../../components/forms/userForm';
import MiniDrawer from '../../components/Shared/navBar';
import { Box, CircularProgress } from '@mui/material';
import AlertMessage from '../../components/Shared/UI/alertMessage';

const EditUserPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetUsersQuery();

  // Safely extract 'users' array
  const users = Array.isArray(data?.users) ? data.users : [];

  // Find user by id
  const user = users.find((u) => u.id === Number(id));

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <AlertMessage msg="Failed to load user!" />;
  }

  return (
    <>
      <MiniDrawer />
      {user ? <UserForm user={user} /> : <AlertMessage msg="User not found!" />}
    </>
  );
};

export default EditUserPage;