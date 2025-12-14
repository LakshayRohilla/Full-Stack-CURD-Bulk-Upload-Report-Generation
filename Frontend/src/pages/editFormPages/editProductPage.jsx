import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../store/slice/productApiSlice';
import ProductForm from '../../components/forms/productForm';
import MiniDrawer from '../../components/Shared/navBar';
import { Box, CircularProgress } from '@mui/material';
import AlertMessage from '../../components/Shared/UI/alertMessage';

const EditProductPage = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetProductsQuery();

    // Safely extract products array
    const products = Array.isArray(data?.products) ? data.products : [];

    // Find product by id
    const product = products.find((p) => p.id === Number(id));

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <AlertMessage msg="Failed to load product!" />;
    }

    return (
        <>
            <MiniDrawer />
            {product ? (
                <ProductForm product={product} />
            ) : (
                <AlertMessage msg="Product not found!" />
            )}
        </>
    );
};

export default EditProductPage;