import MiniDrawer from "../components/Shared/navBar";
import { Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <>
      <MiniDrawer />
      <Typography sx={{ marginBottom: 2, fontWeight:"bold" }} variant="h3" mx={12}>
        page not exist !!
      </Typography>
    </>
  );
};

export default ErrorPage;
