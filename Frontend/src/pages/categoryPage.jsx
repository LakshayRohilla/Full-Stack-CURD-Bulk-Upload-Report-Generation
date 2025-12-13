import { Typography, Box } from "@mui/material";
import MiniDrawer from "../components/Shared/navBar";
import CategoryFetcher from "../components/fetchers/categoryFetcher";
import AddButton from "../components/Shared/UI/addButton";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  return (
    <>
      <MiniDrawer />
      <Box sx={{ ml: 10, mr: 2 }}>
        <Box sx={{display:'flex', justifyContent:"center" }}>
            <Typography variant="h2" sx={{ fontWeight: "bold"}}>
                All Categories
            </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", }} >
          <AddButton name={"Add Category"} component={Link} to='/createCategory' />
        </Box>
        <CategoryFetcher />
      </Box>
    </>
  );
};

export default CategoryPage;
