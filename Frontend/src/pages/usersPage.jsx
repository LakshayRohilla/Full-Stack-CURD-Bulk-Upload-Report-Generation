import { Typography, Box } from "@mui/material";
import MiniDrawer from "../components/Shared/navBar";
import UserFetcher from "../components/fetchers/userFetcher";
import AddButton from "../components/Shared/UI/addButton";
import { Link } from "react-router-dom";

const UserPage = () => {
  return (
    <>
      <MiniDrawer />
      <Box sx={{ ml: 10, mr: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            All Users
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddButton name={"Add User"} component={Link} to="/createUser" />
        </Box>
        <UserFetcher />
      </Box>
    </>
  );
};

export default UserPage;
