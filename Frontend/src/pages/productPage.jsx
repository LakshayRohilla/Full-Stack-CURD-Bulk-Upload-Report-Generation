import { Typography, Box } from "@mui/material";
import ProductFetcher from "../components/fetchers/productFetcher";
import MiniDrawer from "../components/Shared/navBar";

const ProductPage = () => {
  return (
    <>
      <MiniDrawer />
      <Box sx={{ ml: 10, mr: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          All Products
        </Typography>
        <ProductFetcher />
      </Box>
    </>
  );
};

export default ProductPage;
