import { useParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../store/slice/categoryApiSlice';
import CategoryForm from '../../components/forms/categoryForm';
import MiniDrawer from '../../components/Shared/navBar';
import { Box, CircularProgress } from '@mui/material';
import AlertMessage from '../../components/Shared/UI/alertMessage';

const EditCategoryPage = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetCategoriesQuery();

    // Safely extract categories array
    const categories = Array.isArray(data?.categories) ? data.categories : [];

    // Find the category by id
    const category = categories.find((c) => c.id === Number(id));

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <AlertMessage msg="Failed to load category!" />;
    }

    return (
        <>
            <MiniDrawer />
            {category ? (
                <CategoryForm category={category} />
            ) : (
                <AlertMessage msg="Category not found!" />
            )}
        </>
    );
};

export default EditCategoryPage;