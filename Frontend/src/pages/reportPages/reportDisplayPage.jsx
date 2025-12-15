import ReportDisplay from "../../components/report/reportDisplay";
import MiniDrawer from "../../components/Shared/navBar";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const ReportDisplayPage = () => {
    const { state } = useLocation();
    return (
        <>
            <MiniDrawer/>
            <Box sx={{ ml: 10, mr: 2 }}>
                <ReportDisplay state={state}/>
            </Box>
        </>
    )
}

export default ReportDisplayPage;