import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation
} from '../../store/slice/categoryApiSlice';
import CenteralizedTable from '../Shared/UI/centeralizedTable';
import { CircularProgress, Box } from '@mui/material';
import AlertMessage from '../Shared/UI/alertMessage';
import { useNavigate } from 'react-router-dom';

export default function CategoryFetcher() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  const categories = Array.isArray(data?.categories) ? data.categories : [];

  const columns = [
    { id: 'id', label: 'ID', numeric: true },
    { id: 'name', label: 'Category Name', numeric: false },
    { id: 'createdAt', label: 'Created At', numeric: false },
    { id: 'updatedAt', label: 'Updated At', numeric: false },
  ];

  const rows = categories.map((c) => ({
    id: c.id,
    name: c.name,
    createdAt: new Date(c.createdAt).toLocaleString(),
    updatedAt: new Date(c.updatedAt).toLocaleString(),
  }));

  const handleEdit = async (id) => {
    navigate(`/category/edit/${id}`);
  };

  const handleDelete = async (ids) => {
    for (const id of ids) {
      await deleteCategory(id).unwrap();
    }
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
        <AlertMessage msg="Unable to fetch categories!" />
      </Box>
    );
  }

  return (
    <CenteralizedTable
      title="Categories"
      columns={columns}
      rows={rows}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}