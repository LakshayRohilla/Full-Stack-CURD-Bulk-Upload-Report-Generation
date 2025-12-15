import { useLocation } from 'react-router-dom';
import { useGetProductReportQuery } from '../../store/slice/reportApiSlice';
import CenteralizedTable from '../Shared/UI/centeralizedTable';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function ReportDisplay({state}) {
  const { startDate, endDate, categoryId } = state || {};

  const { data, isLoading, error } = useGetProductReportQuery({
    startDate,
    endDate,
    categoryId,
    limit: 100,
    offset: 0
  });

  if (!state) return <Typography>No filters provided.</Typography>;
  if (isLoading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error loading report</Typography>;

  const products = data?.products || [];
  const summary = data?.categorySummary || [];

  const columns = [
    { id: 'id', label: 'ID', numeric: true },
    { id: 'name', label: 'Product Name', numeric: false },
    { id: 'price', label: 'Price', numeric: true },
    { id: 'categoryName', label: 'Category', numeric: false },
    { id: 'createdAt', label: 'Created At', numeric: false },
    { id: 'updatedAt', label: 'Updated At', numeric: false },
  ];

  const rows = products.map(p => ({
    id: p.id,
    name: p.name,
    price: Number(p.price).toFixed(2),
    categoryName: p.categoryName,
    createdAt: new Date(p.createdAt).toLocaleString(),
    updatedAt: new Date(p.updatedAt).toLocaleString(),
  }));

  return (
    <>
      <Typography variant="h6" sx={{mb:2}}>Products Report Preview</Typography>
      <CenteralizedTable
        title="Products"
        columns={columns}
        rows={rows}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      
      <Typography variant="h6" sx={{mt:4}}>Category Summary</Typography>
      <ul>
        {summary.map(s => (
          <li key={s.id}>{s.name} - {s.productCount} product(s)</li>
        ))}
      </ul>
    </>
  );
}