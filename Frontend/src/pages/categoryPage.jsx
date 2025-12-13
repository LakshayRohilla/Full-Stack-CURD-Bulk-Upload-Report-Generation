import { Typography, Box } from "@mui/material";
import MiniDrawer from "../components/Shared/navBar";
import CategoryFetcher from "../components/fetchers/categoryFetcher";

const CategoryPage = () => {
  return (
    <>
      <MiniDrawer />
      <Box sx={{ ml: 10, mr: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          All Categories
        </Typography>
        <CategoryFetcher/>
      </Box>
    </>
  );
};

export default CategoryPage;
