import { Typography, Box } from "@mui/material";
import MiniDrawer from "../components/Shared/navBar";
import UserFetcher from "../components/fetchers/userFetcher";

const UserPage = () => {
  return (
    <>
      <MiniDrawer />
      <Box sx={{ ml: 10, mr: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          All Users
        </Typography>
        <UserFetcher/>
      </Box>
    </>
  );
};

export default UserPage;
