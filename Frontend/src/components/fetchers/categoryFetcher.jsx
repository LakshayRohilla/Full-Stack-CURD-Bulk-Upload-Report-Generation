import { useGetCategoriesQuery } from '../../store/slice/categoryApiSlice';
import CenteralizedTable from '../Shared/UI/centeralizedTable';
import { CircularProgress, Box } from '@mui/material';
import AlertMessage from '../Shared/UI/alertMessage';

export default function CategoryFetcher() {
  const { data, error, isLoading } = useGetCategoriesQuery();

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

  const handleEdit = (id) => {
    console.log(`Edit category with id: ${id}`);
    // TODO: implement edit logic
  };

  const handleDelete = (ids) => {
    console.log(`Delete categories with ids:`, ids);
    // TODO: implement delete logic
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
        <AlertMessage msg="Unable to fetch the categories!!" />
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