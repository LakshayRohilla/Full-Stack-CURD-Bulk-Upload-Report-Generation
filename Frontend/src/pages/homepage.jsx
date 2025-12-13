import MiniDrawer from "../components/Shared/navBar";
import { Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <MiniDrawer />
      <Typography sx={{ marginBottom: 2 }} variant="h3">
        Welcome to the application
      </Typography>
    </>
  );
};

export default HomePage;
