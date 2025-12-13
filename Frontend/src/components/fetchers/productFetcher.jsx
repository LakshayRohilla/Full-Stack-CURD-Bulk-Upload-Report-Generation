import { useGetProductsQuery } from '../../store/slice/productApiSlice';
import CenteralizedTable from '../Shared/UI/centeralizedTable';
import { CircularProgress, Box} from '@mui/material';
import AlertMessage from '../Shared/UI/alertMessage';

export default function ProductFetcher() {
  const { data, error, isLoading } = useGetProductsQuery();

  const products = Array.isArray(data?.products) ? data.products : [];


  const columns = [
    { id: 'id', label: 'ID', numeric: true },
    { id: 'name', label: 'Product Name', numeric: false },
    { id: 'price', label: 'Price', numeric: true },
    { id: 'category', label: 'Category', numeric: false },
    { id: 'categoryId', label: 'Category ID', numeric: true },
    { id: 'createdAt', label: 'Created At', numeric: false },
    { id: 'updatedAt', label: 'Updated At', numeric: false },
  ];

  const rows = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price).toFixed(2),
    category: p.category,
    categoryId: p.categoryId,
    createdAt: new Date(p.createdAt).toLocaleString(),
    updatedAt: new Date(p.updatedAt).toLocaleString(),
  }));

  const handleEdit = (id) => {
    console.log(`Edit product with id: ${id}`);
    // TODO: implement modal or navigation
  };

  const handleDelete = (ids) => {
    console.log(`Delete products with ids:`, ids);
    // TODO: implement delete API call and refetch
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
            <AlertMessage msg={"Unable to fetch the products !!"}/>
        </Box>
    );
  }

  return (
    <CenteralizedTable
      columns={columns}
      rows={rows}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}