import { Typography, Box } from "@mui/material";
import ProductFetcher from "../components/fetchers/productFetcher";
import MiniDrawer from "../components/Shared/navBar";
import AddButton from "../components/Shared/UI/addButton";
import { Link } from "react-router-dom";

const ProductPage = () => {
  return (
    <>
      <MiniDrawer />
      <Box sx={{ ml: 10, mr: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            All Products
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddButton name={"Add Product"} component={Link} to="/createProduct" />
        </Box>
        <ProductFetcher />
      </Box>
    </>
  );
};

export default ProductPage;
